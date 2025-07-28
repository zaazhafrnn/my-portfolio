"use client";
import React, {
  FC,
  useState,
  useRef,
  useEffect,
  useCallback,
  MouseEvent as ReactMouseEvent,
} from "react";
import Image from "next/image";

const PhotosApp: FC = () => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentRotation, setCurrentRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const photos: string[] = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop",
  ];

  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentRotation(rotation);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      const rotationDelta = deltaX * 0.5;
      setRotation(currentRotation + rotationDelta);
    },
    [isDragging, startX, currentRotation],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = (_e: ReactMouseEvent<HTMLDivElement>) => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (!isDragging) return;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className="p-6 h-full overflow-hidden">
      <div className="flex items-center justify-center h-full">
        <div
          ref={containerRef}
          className="cursor-grab active:cursor-grabbing"
          style={{ perspective: "1200px", width: "400px", height: "400px" }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="relative w-full h-full transition-transform duration-100"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateY(${rotation}deg)`,
              transformOrigin: "50% 50%",
            }}
          >
            {photos.map((photo, index) => {
              const angle = (360 / photos.length) * index;
              const translateZ = 110;
              return (
                <div
                  key={index}
                  className="absolute w-52 h-52 rounded-xl overflow-hidden"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${translateZ}px) rotateY(90deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <Image
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                    width={208}
                    height={208}
                  />
                  <div
                    className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl"
                    style={{
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <div className="flex items-center justify-center h-full">
                      <div className="text-white/40 text-sm font-mono">
                        Photo {index + 1}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotosApp;
