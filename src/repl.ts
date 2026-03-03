import { createInterface } from "node:readline";
import type { CLICommand } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

export function cleanInput(input: string): string[] {
  // logic goes here
  //   The purpose of this function will be to split the user's input into "words" based on whitespace. It should also lowercase the input and trim any leading or trailing whitespace. For example:
  // hello world -> ["hello", "world"]
  // Charmander Bulbasaur PIKACHU -> ["charmander", "bulbasaur", "pikachu"]

  return input.trim().toLowerCase().split(/\s+/);
}

export function startREPL() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  rl.prompt();

  rl.on("line", (line) => {
    if (line !== "") {
      const command = getCommands()[cleanInput(line)[0]];
      if (command) {
        try {
          command.callback(getCommands());
        } catch (e) {
          console.log(e);
        }
      } else {
        console.log("Unkown command");
      }
    }
    rl.prompt();
  });
}

// REGISTRY

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
