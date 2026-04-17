'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import { DetectedObject } from '@/app/types';
import { DETECTION_CONFIG } from '@/app/config/detection.config';
import { PerformanceMonitor } from '@/app/utils/performanceMonitor';

export const useObjectDetection = (
  videoRef: React.RefObject<HTMLVideoElement | null>,
  isActive: boolean,
) => {
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [detectedObjects, setDetectedObjects] = useState<DetectedObject[]>([]);
  const [fps, setFps] = useState(0);

  const animationFrameRef = useRef<number | undefined>(undefined);
  const performanceMonitor = useRef(new PerformanceMonitor());
  const lastDetectionTime = useRef(0);

  // Load COCO-SSD model
  useEffect(() => {
    const loadModel = async () => {
      try {
        console.log('Loading COCO-SSD model...');
        const loadedModel = await cocoSsd.load();
        setModel(loadedModel);
        setIsModelLoading(false);
        console.log('Model loaded successfully');
      } catch (error) {
        console.error('Error loading model:', error);
        setIsModelLoading(false);
      }
    };

    loadModel();
  }, []);

  // Detection loop
  const detectObjects = useCallback(async () => {
    if (
      !model ||
      !videoRef.current ||
      !isActive ||
      videoRef.current.readyState !== 4
    ) {
      if (isActive) {
        animationFrameRef.current = requestAnimationFrame(detectObjects);
      }
      return;
    }

    const currentTime = performance.now();
    const timeSinceLastDetection = currentTime - lastDetectionTime.current;

    // Throttle detection based on config
    if (timeSinceLastDetection < DETECTION_CONFIG.DETECTION_INTERVAL) {
      animationFrameRef.current = requestAnimationFrame(detectObjects);
      return;
    }

    try {
      const detectionStartTime = performance.now();

      // Run prediction
      const predictions = await model.detect(videoRef.current);

      const detectionEndTime = performance.now();
      const detectionTime = detectionEndTime - detectionStartTime;

      performanceMonitor.current.recordDetectionTime(detectionTime);
      lastDetectionTime.current = currentTime;

      // Filter and transform predictions
      const filteredObjects: DetectedObject[] = predictions
        .filter((prediction) => {
          // Filter by confidence
          if (prediction.score < DETECTION_CONFIG.MIN_CONFIDENCE) return false;

          // Filter by relevant classes (optional)
          // Uncomment to enable class filtering:
          // return DETECTION_CONFIG.RELEVANT_CLASSES.includes(prediction.class);

          return true;
        })
        .map((prediction, index) => ({
          id: `${prediction.class}-${index}-${Date.now()}`,
          class: prediction.class,
          score: prediction.score,
          bbox: prediction.bbox as [number, number, number, number],
          timestamp: Date.now(),
        }));

      setDetectedObjects(filteredObjects);

      // Update FPS
      performanceMonitor.current.updateFrame();
      setFps(performanceMonitor.current.getFPS());
    } catch (error) {
      console.error('Detection error:', error);
    }

    animationFrameRef.current = requestAnimationFrame(detectObjects);
  }, [model, videoRef, isActive]);

  // Start/stop detection loop
  useEffect(() => {
    if (isActive && model) {
      detectObjects();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, model, detectObjects]);

  return {
    isModelLoading,
    detectedObjects,
    fps,
    performanceMetrics: performanceMonitor.current.getMetrics(),
  };
};
