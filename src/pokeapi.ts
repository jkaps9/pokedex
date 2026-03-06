import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  private cache: any;

  constructor() {
    this.cache = new Cache(300000); // 5 min cache (300k ms)
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    
    const url = pageURL ? pageURL : PokeAPI.baseURL + "/location-area/";
    
    if (this.cache.has(url)) {
      console.log("using cached response");
      return this.cache.get(url)!;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json() as ShallowLocations;
    this.cache.add(url, data);
    return data;
  }

  async fetchLocation(locationName: string): Promise<void> {
    // Promise<Location>
    // implement this
  }
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Location[];
};

export type Location = {
  name: string;
  url: string;
};
