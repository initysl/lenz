import { API_CONFIG } from '@/app/config/api.config';
import { CacheService } from './cacheService';

interface WikiDataEntity {
  label?: string;
  description?: string;
  wikipediaUrl?: string;
  image?: string;
}

export class WikiDataService {
  /**
   * Search WikiData for entity by name
   */
  static async searchEntity(name: string): Promise<WikiDataEntity | null> {
    const cacheKey = `wikidata_${name.toLowerCase()}`;

    const cached = CacheService.get<WikiDataEntity>(cacheKey);
    if (cached) return cached;

    try {
      const searchUrl = new URL(API_CONFIG.WIKIDATA_API_URL);
      searchUrl.searchParams.append('action', 'wbsearchentities');
      searchUrl.searchParams.append('search', name);
      searchUrl.searchParams.append('language', 'en');
      searchUrl.searchParams.append('format', 'json');
      searchUrl.searchParams.append('origin', '*');

      const response = await fetch(searchUrl.toString(), {
        signal: AbortSignal.timeout(API_CONFIG.WIKIDATA_TIMEOUT),
      });

      if (!response.ok) return null;

      const data = await response.json();

      if (!data.search || data.search.length === 0) return null;

      const firstResult = data.search[0];
      const entityId = firstResult.id;

      // Fetch full entity data
      const entityData = await this.fetchEntity(entityId);

      if (entityData) {
        CacheService.set(cacheKey, entityData);
      }

      return entityData;
    } catch (error) {
      console.error('WikiData search error:', error);
      return null;
    }
  }

  /**
   * Fetch full entity data by ID
   */
  private static async fetchEntity(
    entityId: string,
  ): Promise<WikiDataEntity | null> {
    try {
      const entityUrl = new URL(API_CONFIG.WIKIDATA_API_URL);
      entityUrl.searchParams.append('action', 'wbgetentities');
      entityUrl.searchParams.append('ids', entityId);
      entityUrl.searchParams.append(
        'props',
        'labels|descriptions|sitelinks|claims',
      );
      entityUrl.searchParams.append('languages', 'en');
      entityUrl.searchParams.append('format', 'json');
      entityUrl.searchParams.append('origin', '*');

      const response = await fetch(entityUrl.toString(), {
        signal: AbortSignal.timeout(API_CONFIG.WIKIDATA_TIMEOUT),
      });

      if (!response.ok) return null;

      const data = await response.json();
      const entity = data.entities?.[entityId];

      if (!entity) return null;

      const result: WikiDataEntity = {
        label: entity.labels?.en?.value,
        description: entity.descriptions?.en?.value,
      };

      // Get Wikipedia URL
      if (entity.sitelinks?.enwiki) {
        const title = entity.sitelinks.enwiki.title.replace(/ /g, '_');
        result.wikipediaUrl = `https://en.wikipedia.org/wiki/${title}`;
      }

      // Get image (P18)
      const imageClaim = entity.claims?.P18?.[0];
      if (imageClaim) {
        const imageFile = imageClaim.mainsnak?.datavalue?.value;
        if (imageFile) {
          // WikiMedia Commons image URL
          result.image = `https://commons.wikimedia.org/wiki/Special:FilePath/${imageFile}`;
        }
      }

      return result;
    } catch (error) {
      console.error('WikiData entity fetch error:', error);
      return null;
    }
  }

  /**
   * Enrich place data with WikiData info
   */
  static async enrichPlace(
    placeName: string,
  ): Promise<Partial<WikiDataEntity>> {
    const entity = await this.searchEntity(placeName);

    if (!entity) return {};

    return {
      description: entity.description,
      wikipediaUrl: entity.wikipediaUrl,
    };
  }
}
