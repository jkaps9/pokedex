export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    //Promise<ShallowLocations>

    const url = pageURL ? pageURL : PokeAPI.baseURL + "/location-area/";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return response.json() as Promise<ShallowLocations>;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    // Promise<Location>
    const url = PokeAPI.baseURL + `/location-area/${locationName}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }                                                                       
    return response.json() as Promise<Location>;
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
