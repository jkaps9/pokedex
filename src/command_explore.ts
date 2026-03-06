import type { State } from "./state.js";
import type { Location } from "./pokeapi.js";

export async function commandExplore(state: State, locationName: string) {
  try {
    const data = await state.pokeAPI.fetchLocation(locationName);
    data.pokemon_encounters.forEach((loc: Location) => {
      console.log(loc.name);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
  state.readlineInterface.prompt();
}
