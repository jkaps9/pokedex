import type { State } from "./state.js";
import type { Location } from "./pokeapi.js";

export async function commandExplore(state: State, locationName: string) {
  console.log(`Exploring ${locationName}`);
  try {
    const data = await state.pokeAPI.fetchLocation(locationName);
    console.log("Found Pokemon:");
    data.pokemon_encounters.forEach((pokemon: any) => {
      console.log(` - ${pokemon.pokemon.name}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
  state.readlineInterface.prompt();
}
