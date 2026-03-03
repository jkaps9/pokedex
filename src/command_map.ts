import type { State } from "./state.js";

export async function commandMap(state: State) {
  console.log("Fetching locations...");
  state.pokeAPI.fetchLocations();
}
