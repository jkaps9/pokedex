export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<void> {
    //Promise<ShallowLocations>
    const url = PokeAPI.baseURL + "/location-area/";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  async fetchLocation(locationName: string): Promise<void> {
    // Promise<Location>
    // implement this
  }
}

export type ShallowLocations = {
  // add properties here
  name: string;
  url: string;
};

export type Location = {
  // add properties here
};
