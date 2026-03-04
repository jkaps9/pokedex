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
      if (data.next) {
        state.nextLocationsURL = data.next;
      } else {
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
  }
    state.readlineInterface.prompt();
}
