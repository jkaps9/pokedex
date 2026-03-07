import type { State } from "./state.js";

export async function commandPokedex(state: State) {
  if (state.caughtPokemon.keys().toArray().length === 0) {
    console.log("You haven't caught any pokemon yet");
  } else {
    console.log("Your Pokedex:");
    state.caughtPokemon
      .keys()
      .toArray()
      .forEach((key) => {
        console.log(` - ${key}`);
      });
  }
  state.readlineInterface.prompt();
}
