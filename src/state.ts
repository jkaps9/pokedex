import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export type State = {
  readlineInterface: Interface;
  commandRegistry: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  const state: State = {
    readlineInterface: rl,
    commandRegistry: getCommands(),
    pokeAPI: new PokeAPI(),
  };

  return state;
}

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    // can add more commands here
  };
}
