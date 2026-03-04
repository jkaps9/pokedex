import type { State } from "./state.js";
import type { Location } from "./pokeapi.js";

export async function commandMap(state: State) {
  try {
    const data = await state.pokeAPI.fetchLocations(
      state.nextLocationsURL === "" ? "" : state.nextLocationsURL,
    );
    data.results.forEach((loc: Location) => {
      console.log(loc.name);
    });
    console.log(data.next);
    if (data.next) {
        state.nextLocationsURL = data.next;                                       } else {
        state.nextLocationsURL = "";
      }
      if(data.previous) {
        state.prevLocationsURL = data.previous;
      } else {
        state.prevLocationsURL = "";
      }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
  state.readlineInterface.prompt();
}
