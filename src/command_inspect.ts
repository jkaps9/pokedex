import type { State } from "./state.js";
import type { Pokemon } from "./pokeapi.js";

export async function commandInspect(state: State, pokemonName: string) {
  if (state.caughtPokemon.has(pokemonName)) {
    const data = state.caughtPokemon.get(pokemonName);
    console.log(data);
  } else {
    console.log("you have not caught that pokemon");
  }
  state.readlineInterface.prompt();
}
