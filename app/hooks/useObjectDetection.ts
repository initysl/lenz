'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { DetectedObject } from '@/app/types';
import { DETECTION_CONFIG } from '@/app/config/detection.config';
import { PerformanceMonitor } from '@/app/utils/performanceMonitor';

export const useObjectDetection = (
  videoRef: React.RefObject<HTMLVideoElement | null>,
  isActive: boolean,
) => {
  const [detectedObjects, setDetectedObjects] = useState<DetectedObject[]>([]);
  const [fps, setFps] = useState(0);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [useWorker] = useState(() => typeof Worker !== 'undefined');

  const workerRef = useRef<Worker | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const performanceMonitor = useRef(new PerformanceMonitor());
  const lastDetectionTime = useRef(0);
  const isProcessing = useRef(false);

  // Initialize worker or fallback
  useEffect(() => {
    if (!useWorker) {
      // Fallback: load model directly
      import('@tensorflow-models/coco-ssd').then(async (cocoSsd) => {
        const model = await cocoSsd.load();
        workerRef.current = model as any; // Store model
        setIsModelLoading(false);
      });
      return;
    }

    // Use Web Worker
    const worker = new Worker('/workers/detectionWorker.js');

    worker.onmessage = (e) => {
      const { type, predictions, error } = e.data;

      switch (type) {
        case 'MODEL_LOADED':
          setIsModelLoading(false);
          console.log('Detection model loaded in worker');
          break;

        case 'DETECTIONS':
          isProcessing.current = false;
          processDetections(predictions);
          break;

        case 'ERROR':
        case 'MODEL_ERROR':
          console.error('Worker error:', error);
          isProcessing.current = false;
          setIsModelLoading(false);
          break;
      }
    };

    worker.postMessage({ type: 'LOAD_MODEL' });
    workerRef.current = worker;

    return () => {
      worker.terminate();
    };
  }, [useWorker]);

  // Initialize offscreen canvas
  useEffect(() => {
    canvasRef.current = document.createElement('canvas');
  }, []);

  // Process detection results
  const processDetections = useCallback((predictions: any[]) => {
    const filteredObjects: DetectedObject[] = predictions
      .filter(
        (prediction) => prediction.score >= DETECTION_CONFIG.MIN_CONFIDENCE,
      )
      .map((prediction, index) => ({
        id: `${prediction.class}-${index}-${Date.now()}`,
        class: prediction.class,
        score: prediction.score,
        bbox: prediction.bbox as [number, number, number, number],
        timestamp: Date.now(),
      }));

    setDetectedObjects(filteredObjects);
    performanceMonitor.current.updateFrame();
    setFps(performanceMonitor.current.getFPS());
  }, []);

  // Detection loop
  const detectObjects = useCallback(async () => {
    if (
      !videoRef.current ||
      !isActive ||
      videoRef.current.readyState !== 4 ||
      isProcessing.current
    ) {
      if (isActive) {
        animationFrameRef.current = requestAnimationFrame(detectObjects);
      }
      return;
    }

    const currentTime = performance.now();
    const timeSinceLastDetection = currentTime - lastDetectionTime.current;

    if (timeSinceLastDetection < DETECTION_CONFIG.DETECTION_INTERVAL) {
      animationFrameRef.current = requestAnimationFrame(detectObjects);
      return;
    }

    isProcessing.current = true;
    lastDetectionTime.current = currentTime;

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current!;

      // Resize canvas to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(video, 0, 0);

      if (useWorker && workerRef.current instanceof Worker) {
        // Send to worker
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        workerRef.current.postMessage(
          {
            type: 'DETECT',
            payload: {
              imageData: imageData.data.buffer,
              width: canvas.width,
              height: canvas.height,
            },
          },
          [imageData.data.buffer], // Transfer ownership
        );
      } else if (workerRef.current) {
        // Fallback: use model directly
        const model = workerRef.current as any;
        const predictions = await model.detect(canvas);
        processDetections(predictions);
        isProcessing.current = false;
      }
    } catch (error) {
      console.error('Detection error:', error);
      isProcessing.current = false;
    }

    animationFrameRef.current = requestAnimationFrame(detectObjects);
  }, [videoRef, isActive, useWorker, processDetections]);

  // Start/stop detection
  useEffect(() => {
    if (isActive && !isModelLoading) {
      detectObjects();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, isModelLoading, detectObjects]);

  return {
    isModelLoading,
    detectedObjects,
    fps,
    performanceMetrics: performanceMonitor.current.getMetrics(),
  };
};
