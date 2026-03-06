import type { State } from "./state.js";
import type { Location } from "./pokeapi.js";

export async function commandMap(state: State) {
  try {
    const url = state.nextLocationsURL === "" ? "" : state.nextLocationsURL;
    const data = await state.pokeAPI.fetchLocations(url);
    data.results.forEach((loc: Location) => {
      console.log(loc.name);
    });

    state.nextLocationsURL = data.next ?? "";
    state.prevLocationsURL = data.previous ?? "";
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
  state.readlineInterface.prompt();
}
