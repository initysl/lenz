'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { DetectedObject, Place, GPSCoordinates } from '@/app/types';
import { spatialUtils } from '@/app/utils/spatialCalculations';
import { OpenStreetMapService } from '@/app/services/openStreetMapService';
import { WikiDataService } from '@/app/services/wikiDataService';
import { API_CONFIG } from '@/app/config/api.config';

interface MatchedPlace extends Place {
  matchConfidence: number;
  detectedObjectId: string;
}

export const useSpatialMatching = (
  detectedObjects: DetectedObject[],
  location: GPSCoordinates | null,
  compassHeading: number | null,
) => {
  const [nearbyPlaces, setNearbyPlaces] = useState<Place[]>([]);
  const [matchedPlaces, setMatchedPlaces] = useState<MatchedPlace[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastFetchLocation, setLastFetchLocation] =
    useState<GPSCoordinates | null>(null);

  // Add debounce timer ref
  const fetchTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  // Fetch nearby places when location changes significantly
  useEffect(() => {
    if (!location) return;

    // Clear existing timer
    if (fetchTimerRef.current) {
      clearTimeout(fetchTimerRef.current);
    }

    // Check if we need to fetch (moved more than 50m from last fetch)
    if (lastFetchLocation) {
      const distance = spatialUtils.calculateDistance(
        location.latitude,
        location.longitude,
        lastFetchLocation.latitude,
        lastFetchLocation.longitude,
      );

      if (distance < 50) return; // Don't fetch if moved less than 50m
    }

    // Debounce: wait 1 second after location stabilizes
    fetchTimerRef.current = setTimeout(() => {
      const fetchPlaces = async () => {
        setIsLoading(true);
        try {
          const places = await OpenStreetMapService.fetchNearbyPlaces(
            location.latitude,
            location.longitude,
            API_CONFIG.SEARCH_RADIUS.MEDIUM,
          );

          // Calculate distance and bearing for each place
          const placesWithMetrics = places.map((place) => ({
            ...place,
            distance: spatialUtils.calculateDistance(
              location.latitude,
              location.longitude,
              place.latitude,
              place.longitude,
            ),
            bearing: spatialUtils.calculateBearing(
              location.latitude,
              location.longitude,
              place.latitude,
              place.longitude,
            ),
          }));

          setNearbyPlaces(placesWithMetrics);
          setLastFetchLocation(location);
        } catch (error) {
          console.error('Failed to fetch nearby places:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPlaces();
    }, 1000); // 1 second debounce

    return () => {
      if (fetchTimerRef.current) {
        clearTimeout(fetchTimerRef.current);
      }
    };
  }, [location, lastFetchLocation]);

  // Match detected objects to places
  useEffect(() => {
    if (!location || !compassHeading || nearbyPlaces.length === 0) {
      setMatchedPlaces([]);
      return;
    }

    const matches: MatchedPlace[] = [];

    // Only match "building-like" detected objects
    const buildingObjects = detectedObjects.filter(
      (obj) =>
        // COCO-SSD doesn't have a "building" class, so we use heuristics
        // Large objects in the frame are likely buildings
        obj.bbox[2] * obj.bbox[3] > 50000, // width * height > threshold
    );

    buildingObjects.forEach((obj) => {
      // Calculate the direction the camera is pointing at this object
      // For simplicity, assume center of frame is where camera points
      // In production, you'd calculate based on bbox position and FOV
      const objectBearing = compassHeading; // Simplified

      // Find nearby places within a cone of the camera direction
      const CONE_ANGLE = 30; // degrees

      nearbyPlaces.forEach((place) => {
        if (!place.bearing || !place.distance) return;

        const bearingDiff = spatialUtils.getAngularDifference(
          objectBearing,
          place.bearing,
        );

        // Check if place is within the cone and close enough
        if (bearingDiff <= CONE_ANGLE && place.distance <= 300) {
          // Calculate confidence score
          const bearingScore = 1 - bearingDiff / CONE_ANGLE; // 0-1
          const distanceScore = 1 - place.distance / 300; // 0-1
          const confidence = (bearingScore * 0.6 + distanceScore * 0.4) * 100;

          if (confidence > 40) {
            // Only show matches above 40% confidence
            matches.push({
              ...place,
              matchConfidence: confidence,
              detectedObjectId: obj.id,
            });
          }
        }
      });
    });

    // Sort by confidence
    matches.sort((a, b) => b.matchConfidence - a.matchConfidence);

    // Remove duplicates (same place matched to multiple objects)
    const uniqueMatches = matches.filter(
      (match, index, self) =>
        index === self.findIndex((m) => m.id === match.id),
    );

    setMatchedPlaces(uniqueMatches);
  }, [detectedObjects, nearbyPlaces, location, compassHeading]);

  // Enrich a place with WikiData info
  const enrichPlace = useCallback(async (place: Place): Promise<Place> => {
    const wikiData = await WikiDataService.enrichPlace(place.name);

    return {
      ...place,
      description: wikiData.description || place.description,
    };
  }, []);

  return {
    nearbyPlaces,
    matchedPlaces,
    isLoading,
    enrichPlace,
  };
};
