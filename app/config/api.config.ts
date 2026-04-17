export const API_CONFIG = {
  // OpenStreetMap Overpass API
  OSM_OVERPASS_URL: 'https://overpass-api.de/api/interpreter',
  OSM_TIMEOUT: 25, // seconds
  OSM_MAX_RESULTS: 50,

  // WikiData API
  WIKIDATA_API_URL: 'https://www.wikidata.org/w/api.php',
  WIKIDATA_TIMEOUT: 10000, // ms

  // Search radius (meters)
  SEARCH_RADIUS: {
    SMALL: 100,
    MEDIUM: 250,
    LARGE: 500,
  },

  // Cache settings
  CACHE_TTL: 24 * 60 * 60 * 1000, // 24 hours in ms
  CACHE_PREFIX: 'lenz_cache_',
};

export const PLACE_CATEGORIES = {
  EDUCATION: ['university', 'college', 'school', 'library'],
  HEALTHCARE: ['hospital', 'clinic', 'pharmacy', 'doctors'],
  GOVERNMENT: [
    'townhall',
    'courthouse',
    'police',
    'fire_station',
    'post_office',
  ],
  LANDMARKS: ['monument', 'memorial', 'castle', 'ruins', 'attraction'],
  RELIGIOUS: ['place_of_worship', 'church', 'mosque', 'temple', 'synagogue'],
  COMMERCIAL: ['restaurant', 'cafe', 'shop', 'mall', 'bank', 'hotel'],
  TRANSPORT: ['bus_station', 'train_station', 'airport', 'fuel'],
};
