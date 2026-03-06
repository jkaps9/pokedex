import type { State } from "./state.js";
import type { Location } from "./pokeapi.js";

export async function commandMapB(state: State) {
  if (state.prevLocationsURL === "") {
    console.log("you're on the first page");
  } else {
    try {
      const data = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
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
  }
    state.readlineInterface.prompt();
}
