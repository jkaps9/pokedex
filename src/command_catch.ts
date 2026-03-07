import type { State } from "./state.js";
import type { Location } from "./pokeapi.js";

export async function commandCatch(state: State, pokemonName: string) {
  try {
    const data = await state.pokeAPI.fetchPokemon(pokemonName);
    console.log(`Throwing a Pokeball at ${pokemonName}...`);
    if (calculateChance(data.base_experience) >= 0.5) {
      console.log(`${pokemonName} was caught!`);
    } else {
      console.log(`${pokemonName} escaped!`);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`${pokemonName} not found`);
      console.error(error.message);
    }
  }
  state.readlineInterface.prompt();
}

function calculateChance(base_experience: number): number {
  return Math.floor(Math.random() * (800 - base_experience)) / 800;
}
