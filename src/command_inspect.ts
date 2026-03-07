import type { State } from "./state.js";
import type { Pokemon } from "./pokeapi.js";

export async function commandInspect(state: State, pokemonName: string) {
  if (state.caughtPokemon.has(pokemonName)) {
    const data = state.caughtPokemon.get(pokemonName);
    if (data) {
      console.log(data);
      console.log(
        `Name: ${data.name}\nHeight: ${data.height}\nWeight: ${data.weight}`,
      );
      // \nStats: ${data.stats}\nTypes: ${data.types}
      console.log("Stats:");
      data.stats.forEach((item) => {
        console.log(` -${item.stat.name}: ${item.base_stat}`);
      });
      console.log("Types:");
      data.types.forEach((item) => {
        console.log(` - ${item.type.name}`);
      });
    }
  } else {
    console.log("you have not caught that pokemon");
  }
  state.readlineInterface.prompt();
}
