import { Place } from '@/app/types';
import { API_CONFIG } from '@/app/config/api.config';
import { CacheService } from './cacheService';

export class OpenStreetMapService {
  /**
   * Build Overpass QL query for nearby places
   */
  private static buildOverpassQuery(
    latitude: number,
    longitude: number,
    radius: number,
  ): string {
    const query = `
      [out:json][timeout:${API_CONFIG.OSM_TIMEOUT}];
      (
        node["amenity"](around:${radius},${latitude},${longitude});
        node["tourism"](around:${radius},${latitude},${longitude});
        node["historic"](around:${radius},${latitude},${longitude});
        node["building"="university"](around:${radius},${latitude},${longitude});
        node["building"="hospital"](around:${radius},${latitude},${longitude});
        node["building"="school"](around:${radius},${latitude},${longitude});
        way["amenity"](around:${radius},${latitude},${longitude});
        way["tourism"](around:${radius},${latitude},${longitude});
        way["building"="university"](around:${radius},${latitude},${longitude});
        way["building"="hospital"](around:${radius},${latitude},${longitude});
      );
      out body;
      >;
      out skel qt;
    `;
    return query.trim();
  }

  /**
   * Parse OSM element to Place object
   */
  private static parseElement(element: any): Place | null {
    if (!element.tags) return null;

    const name = element.tags.name || element.tags['name:en'] || 'Unnamed';

    // Skip unnamed places unless they're significant buildings
    if (name === 'Unnamed' && !element.tags.building) return null;

    // Determine category
    let category = 'building';
    if (element.tags.amenity) category = element.tags.amenity;
    else if (element.tags.tourism) category = element.tags.tourism;
    else if (element.tags.historic) category = element.tags.historic;
    else if (element.tags.building) category = element.tags.building;

    // Get coordinates
    let latitude = element.lat;
    let longitude = element.lon;

    // For ways, calculate center
    if (!latitude && element.center) {
      latitude = element.center.lat;
      longitude = element.center.lon;
    }

    if (!latitude || !longitude) return null;

    return {
      id: `osm-${element.type}-${element.id}`,
      name,
      category,
      latitude,
      longitude,
      description: element.tags.description,
      source: 'osm',
    };
  }

  /**
   * Fetch nearby places from OpenStreetMap
   */
  static async fetchNearbyPlaces(
    latitude: number,
    longitude: number,
    radius: number = API_CONFIG.SEARCH_RADIUS.MEDIUM,
  ): Promise<Place[]> {
    // Create cache key based on rounded coordinates (to increase cache hits)
    const roundedLat = latitude.toFixed(4);
    const roundedLon = longitude.toFixed(4);
    const cacheKey = `osm_${roundedLat}_${roundedLon}_${radius}`;

    // Check cache
    const cached = CacheService.get<Place[]>(cacheKey);
    if (cached) {
      console.log('OSM: Using cached data');
      return cached;
    }

    try {
      const query = this.buildOverpassQuery(latitude, longitude, radius);

      const response = await fetch(API_CONFIG.OSM_OVERPASS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `data=${encodeURIComponent(query)}`,
      });

      if (!response.ok) {
        throw new Error(`OSM API error: ${response.status}`);
      }

      const data = await response.json();

      const places: Place[] = data.elements
        .map((element: any) => this.parseElement(element))
        .filter((place: Place | null): place is Place => place !== null);

      // Cache results
      CacheService.set(cacheKey, places);

      console.log(`OSM: Found ${places.length} places`);
      return places;
    } catch (error) {
      console.error('OSM fetch error:', error);
      return [];
    }
  }

  /**
   * Search for specific place by name
   */
  static async searchPlace(
    query: string,
    latitude?: number,
    longitude?: number,
  ): Promise<Place[]> {
    const cacheKey = `osm_search_${query}`;

    const cached = CacheService.get<Place[]>(cacheKey);
    if (cached) return cached;

    try {
      const bbox =
        latitude && longitude ? `(around:5000,${latitude},${longitude})` : '';

      const overpassQuery = `
        [out:json][timeout:${API_CONFIG.OSM_TIMEOUT}];
        (
          node["name"~"${query}",i]${bbox};
          way["name"~"${query}",i]${bbox};
        );
        out body;
        >;
        out skel qt;
      `;

      const response = await fetch(API_CONFIG.OSM_OVERPASS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `data=${encodeURIComponent(overpassQuery)}`,
      });

      if (!response.ok) throw new Error(`OSM search error: ${response.status}`);

      const data = await response.json();
      const places = data.elements
        .map((element: any) => this.parseElement(element))
        .filter((place: Place | null): place is Place => place !== null);

      CacheService.set(cacheKey, places, 3600000); // 1 hour cache for searches
      return places;
    } catch (error) {
      console.error('OSM search error:', error);
      return [];
    }
  }
}
