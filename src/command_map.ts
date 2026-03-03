import type { State } from "./state.js";
import type { Location } from "./pokeapi.js";

export async function commandMap(state: State) {
  try {
    const data = await state.pokeAPI.fetchLocations();
    data.results.forEach((loc: Location) => {
      console.log(loc.name);
    });
    state.readlineInterface.prompt();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}
