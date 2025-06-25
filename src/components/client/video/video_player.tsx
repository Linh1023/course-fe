'use client'
import { useEffect, useRef } from "react";

export default function VideoPlayer({ fileName }: { fileName: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = `/api/video/stream/${encodeURIComponent(fileName)}`;
    }
  }, [fileName]);

  return (
    <video ref={videoRef} controls className="w-full  h-full" 
        controlsList="nodownload"
    />
  );
}
