"use client";
import React, {
  FC,
  useState,
  useRef,
  useEffect,
  useCallback,
  MouseEvent as ReactMouseEvent,
  useMemo,
} from "react";
import Image from "next/image";

const PhotosApp: FC = () => {
  const [rotation, setRotation] = useState(-22.5);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentRotation, setCurrentRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const mediaItems = useMemo(
    () => [
      { type: "image", src: "/photos/image-1.png" },
      { type: "video", src: "/photos/video-1.mp4" },
      { type: "image", src: "/photos/image-2.png" },
      { type: "image", src: "/photos/image-3.png" },
      { type: "image", src: "/photos/image-4.png" },
      { type: "video", src: "/photos/video-2.mp4" },
      { type: "image", src: "/photos/image-5.png" },
      { type: "image", src: "/photos/image-6.png" },
    ],
    [],
  );

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

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const videos = containerRef.current?.querySelectorAll("video");

    const ensureVideoPlay = (video: HTMLVideoElement) => {
      const playVideo = () => {
        video.play().catch(() => {});
      };

      video.addEventListener("pause", playVideo);
      video.addEventListener("loadeddata", playVideo);

      playVideo();

      return () => {
        video.removeEventListener("pause", playVideo);
        video.removeEventListener("loadeddata", playVideo);
      };
    };

    const cleanupFunctions: (() => void)[] = [];

    videos?.forEach((video) => {
      const cleanup = ensureVideoPlay(video as HTMLVideoElement);
      if (cleanup) cleanupFunctions.push(cleanup);
    });

    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, [mediaItems]);

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
            {mediaItems.map((item, index) => {
              const angle = (360 / mediaItems.length) * index;
              const translateZ = 125;
              return (
                <div
                  key={index}
                  className="absolute w-64 h-85 rounded-xl overflow-hidden"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${translateZ}px) rotateY(90deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {item.type === "image" ? (
                    <Image
                      src={item.src}
                      alt={`Media ${index + 1}`}
                      className="w-full h-full object-cover"
                      draggable={false}
                      width={208}
                      height={208}
                    />
                  ) : (
                    <video
                      src={item.src}
                      className="w-full h-full object-cover"
                      playsInline
                      autoPlay
                      loop
                      muted
                    />
                  )}
                  <div
                    className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl"
                    style={{
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <div className="flex items-center justify-center h-full">
                      <div className="text-white/40 text-sm font-mono">
                        {item.type === "image" ? "Photo" : "Video"} {index + 1}
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
