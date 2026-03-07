import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { PokeAPI } from "./pokeapi.js";
import type { Pokemon } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  readlineInterface: Interface;
  commandRegistry: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationsURL: string;
  prevLocationsURL: string;
  caughtPokemon: Map<string, Pokemon>;
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
    nextLocationsURL: "",
    prevLocationsURL: "",
    caughtPokemon: new Map<string, Pokemon>(),
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
    map: {
      name: "map",
      description: "Displays next location areas in the Pokemon world",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays previous location areas in the Pokemon world",
      callback: commandMapB,
    },
    explore: {
      name: "explore",
      description:
        "Displays Pokemon in given location using explore <area_name>",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Attempt to catch a Pokemon using catch <pokemon_name>",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description:
        "See details about caught Pokemon using inspect <pokemon_name>",
      callback: commandInspect,
    },

    // can add more commands here
  };
}
