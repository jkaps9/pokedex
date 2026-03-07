import type { State } from "./state.js";

export async function commandHelp(state: State) {
  console.log("Welcome to the Pokedex!\nUsage:\n");
  Object.values(state.commandRegistry)
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((command) => {
      console.log(`${command.name}: ${command.description}`);
    });

  state.readlineInterface.prompt();
}
