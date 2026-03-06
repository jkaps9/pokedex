import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  private cache: any;

  constructor() {
    this.cache = new Cache(300000); // 5 min cache (300k ms)
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    
    const url = pageURL ? pageURL : PokeAPI.baseURL + "/location-area/";

    const response = this.cache.has(url) ? this.cache.get(url) : await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    if(!this.cache.has(url)){
      this.cache.add(url, response);
    } else {
      console.log("using cached response");
    }

    return response.json() as Promise<ShallowLocations>;
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
