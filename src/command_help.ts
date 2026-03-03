import type { CLICommand } from "./CLICommand.js";

export function commandHelp(commands: Record<string, CLICommand>) {
  console.log("Welcome to the Pokedex!\nUsage:\n");
  Object.values(commands)
    .sort((a, b) => b.name.localeCompare(a.name))
    .forEach((command) => {
      console.log(`${command.name}: ${command.description}`);
    });
}
