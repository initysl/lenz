'use client';

import { useEffect, useRef } from 'react';
import { DetectedObject } from '@/app/types';
import { DETECTION_CONFIG } from '@/app/config/detection.config';

interface DetectionCanvasProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  detectedObjects: DetectedObject[];
}

export const DetectionCanvas = ({
  videoRef,
  detectedObjects,
}: DetectionCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Match canvas size to video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw each detection
    detectedObjects.forEach((obj) => {
      const [x, y, width, height] = obj.bbox;
      const color =
        DETECTION_CONFIG.COLORS[
          obj.class as keyof typeof DETECTION_CONFIG.COLORS
        ] || DETECTION_CONFIG.COLORS.default;

      // Draw bounding box
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, width, height);

      // Draw label background
      const label = `${obj.class} ${Math.round(obj.score * 100)}%`;
      ctx.font = 'bold 16px Inter, sans-serif';
      const textMetrics = ctx.measureText(label);
      const textHeight = 20;
      const padding = 6;

      ctx.fillStyle = color;
      ctx.fillRect(
        x,
        y - textHeight - padding,
        textMetrics.width + padding * 2,
        textHeight + padding,
      );

      // Draw label text
      ctx.fillStyle = '#000';
      ctx.fillText(label, x + padding, y - padding);
    });
  }, [detectedObjects, videoRef]);

  return (
    <canvas
      ref={canvasRef}
      className='absolute top-0 left-0 w-full h-full pointer-events-none z-10'
    />
  );
};
