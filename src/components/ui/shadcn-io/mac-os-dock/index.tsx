'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface DockApp {
  id: string;
  name: string;
  icon: string;
}

interface MacOSDockProps {
  apps: DockApp[];
  onAppClick: (appId: string) => void;
  openApps?: string[];
  className?: string;
}

const MacOSDock: React.FC<MacOSDockProps> = ({ 
  apps, 
  onAppClick, 
  openApps = [],
  className = ''
}) => {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [currentScales, setCurrentScales] = useState<number[]>(apps.map(() => 1));
  const [currentPositions, setCurrentPositions] = useState<number[]>([]);
  const dockRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastMouseMoveTime = useRef<number>(0);

  const getResponsiveConfig = useCallback(() => {
    if (typeof window === 'undefined') {
      return { baseIconSize: 64, maxScale: 1.6, effectWidth: 240 };
    }

    const smallerDimension = Math.min(window.innerWidth, window.innerHeight);
    
    if (smallerDimension < 480) {
      return {
        baseIconSize: Math.max(40, smallerDimension * 0.08),
        maxScale: 1.4,
        effectWidth: smallerDimension * 0.4
      };
    } else if (smallerDimension < 768) {
      return {
        baseIconSize: Math.max(48, smallerDimension * 0.07),
        maxScale: 1.5,
        effectWidth: smallerDimension * 0.35
      };
    } else if (smallerDimension < 1024) {
      return {
        baseIconSize: Math.max(56, smallerDimension * 0.06),
        maxScale: 1.6,
        effectWidth: smallerDimension * 0.3
      };
    } else {
      return {
        baseIconSize: Math.max(64, Math.min(80, smallerDimension * 0.05)),
        maxScale: 1.8,
        effectWidth: 300
      };
    }
  }, []);

  const [config, setConfig] = useState(getResponsiveConfig);
  const { baseIconSize, maxScale, effectWidth } = config;
  const minScale = 1.0;
  const baseSpacing = Math.max(4, baseIconSize * 0.08);

  useEffect(() => {
    const handleResize = () => {
      setConfig(getResponsiveConfig());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getResponsiveConfig]);

  const calculateTargetMagnification = useCallback((mousePosition: number | null) => {
    if (mousePosition === null) {
      return apps.map(() => minScale);
    }

    return apps.map((_, index) => {
      const normalIconCenter = (index * (baseIconSize + baseSpacing)) + (baseIconSize / 2);
      const minX = mousePosition - (effectWidth / 2);
      const maxX = mousePosition + (effectWidth / 2);
      
      if (normalIconCenter < minX || normalIconCenter > maxX) {
        return minScale;
      }
      
      const theta = ((normalIconCenter - minX) / effectWidth) * 2 * Math.PI;
      const cappedTheta = Math.min(Math.max(theta, 0), 2 * Math.PI);
      const scaleFactor = (1 - Math.cos(cappedTheta)) / 2;
      
      return minScale + (scaleFactor * (maxScale - minScale));
    });
  }, [apps, baseIconSize, baseSpacing, effectWidth, maxScale, minScale]);

  const calculatePositions = useCallback((scales: number[]) => {
    let currentX = 0;
    
    return scales.map((scale) => {
      const scaledWidth = baseIconSize * scale;
      const centerX = currentX + (scaledWidth / 2);
      currentX += scaledWidth + baseSpacing;
      return centerX;
    });
  }, [baseIconSize, baseSpacing]);

  useEffect(() => {
    const initialScales = apps.map(() => minScale);
    const initialPositions = calculatePositions(initialScales);
    setCurrentScales(initialScales);
    setCurrentPositions(initialPositions);
  }, [apps, calculatePositions, minScale, config]);

  const animateToTarget = useCallback(() => {
    const targetScales = calculateTargetMagnification(mouseX);
    const targetPositions = calculatePositions(targetScales);
    const lerpFactor = mouseX !== null ? 0.2 : 0.12;

    setCurrentScales(prevScales => {
      return prevScales.map((currentScale, index) => {
        const diff = targetScales[index] - currentScale;
        return currentScale + (diff * lerpFactor);
      });
    });

    setCurrentPositions(prevPositions => {
      return prevPositions.map((currentPos, index) => {
        const diff = targetPositions[index] - currentPos;
        return currentPos + (diff * lerpFactor);
      });
    });

    const scalesNeedUpdate = currentScales.some((scale, index) => 
      Math.abs(scale - targetScales[index]) > 0.002
    );
    const positionsNeedUpdate = currentPositions.some((pos, index) => 
      Math.abs(pos - targetPositions[index]) > 0.1
    );
    
    if (scalesNeedUpdate || positionsNeedUpdate || mouseX !== null) {
      animationFrameRef.current = requestAnimationFrame(animateToTarget);
    }
  }, [mouseX, calculateTargetMagnification, calculatePositions, currentScales, currentPositions]);

  useEffect(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(animateToTarget);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animateToTarget]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const now = performance.now();
    
    if (now - lastMouseMoveTime.current < 16) {
      return;
    }
    
    lastMouseMoveTime.current = now;
    
    if (dockRef.current) {
      const rect = dockRef.current.getBoundingClientRect();
      const padding = Math.max(8, baseIconSize * 0.12);
      setMouseX(e.clientX - rect.left - padding);
    }
  }, [baseIconSize]);

  const handleMouseLeave = useCallback(() => {
    setMouseX(null);
  }, []);

  const createBounceAnimation = (element: HTMLElement) => {
    const bounceHeight = Math.max(-8, -baseIconSize * 0.15);
    element.style.transition = 'transform 0.2s ease-out';
    element.style.transform = `translateY(${bounceHeight}px)`;
    
    setTimeout(() => {
      element.style.transform = 'translateY(0px)';
    }, 200);
  };

  const handleAppClick = (appId: string, index: number) => {
    if (iconRefs.current[index]) {
      if (typeof window !== 'undefined' && (window as any).gsap) {
        const gsap = (window as any).gsap;
        const bounceHeight = currentScales[index] > 1.3 ? -baseIconSize * 0.2 : -baseIconSize * 0.15;
        
        gsap.to(iconRefs.current[index], {
          y: bounceHeight,
          duration: 0.2,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
          transformOrigin: 'bottom center'
        });
      } else {
        createBounceAnimation(iconRefs.current[index]!);
      }
    }
    
    onAppClick(appId);
  };

  const contentWidth = currentPositions.length > 0 
    ? Math.max(...currentPositions.map((pos, index) => 
        pos + (baseIconSize * currentScales[index]) / 2
      ))
    : (apps.length * (baseIconSize + baseSpacing)) - baseSpacing;

  const padding = Math.max(8, baseIconSize * 0.12);

  return (
    <div 
      ref={dockRef}
      className={cn('backdrop-blur-md', className)}
      style={{
        width: `${contentWidth + padding * 2}px`,
        background: 'rgba(45, 45, 45, 0.75)',
        borderRadius: `${Math.max(12, baseIconSize * 0.4)}px`,
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: `
          0 ${Math.max(4, baseIconSize * 0.1)}px ${Math.max(16, baseIconSize * 0.4)}px rgba(0, 0, 0, 0.4),
          0 ${Math.max(2, baseIconSize * 0.05)}px ${Math.max(8, baseIconSize * 0.2)}px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.15),
          inset 0 -1px 0 rgba(0, 0, 0, 0.2)
        `,
        padding: `${padding}px`
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="relative"
        style={{
          height: `${baseIconSize}px`,
          width: '100%'
        }}
      >
        {apps.map((app, index) => {
          const scale = currentScales[index];
          const position = currentPositions[index] || 0;
          const scaledSize = baseIconSize * scale;
          
          return (
            <div
              key={app.id}
              ref={(el) => { iconRefs.current[index] = el; }}
              className="absolute cursor-pointer flex flex-col items-center justify-end"
              title={app.name}
              onClick={() => handleAppClick(app.id, index)}
              style={{
                left: `${position - scaledSize / 2}px`,
                bottom: '0px',
                width: `${scaledSize}px`,
                height: `${scaledSize}px`,
                transformOrigin: 'bottom center',
                zIndex: Math.round(scale * 10)
              }}
            >
              <img
                src={app.icon}
                alt={app.name}
                width={scaledSize}
                height={scaledSize}
                className="object-contain"
                style={{
                  filter: `drop-shadow(0 ${scale > 1.2 ? Math.max(2, baseIconSize * 0.05) : Math.max(1, baseIconSize * 0.03)}px ${scale > 1.2 ? Math.max(4, baseIconSize * 0.1) : Math.max(2, baseIconSize * 0.06)}px rgba(0,0,0,${0.2 + (scale - 1) * 0.15}))`
                }}
              />
              
              {openApps.includes(app.id) && (
                <div 
                  className="absolute"
                  style={{
                    bottom: `${Math.max(-2, -baseIconSize * 0.05)}px`,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: `${Math.max(3, baseIconSize * 0.06)}px`,
                    height: `${Math.max(3, baseIconSize * 0.06)}px`,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    boxShadow: '0 0 4px rgba(0, 0, 0, 0.3)',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { MacOSDock, type DockApp, type MacOSDockProps };