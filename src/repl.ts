import { type State } from "./state.js";

export function cleanInput(input: string): string[] {
  // logic goes here
  //   The purpose of this function will be to split the user's input into "words" based on whitespace. It should also lowercase the input and trim any leading or trailing whitespace. For example:
  // hello world -> ["hello", "world"]
  // Charmander Bulbasaur PIKACHU -> ["charmander", "bulbasaur", "pikachu"]

  return input.trim().toLowerCase().split(/\s+/);
}

export function startREPL(state: State) {
  const rl = state.readlineInterface;
  rl.prompt();

  rl.on("line", (line) => {
    if (line !== "") {
      const command = state.commandRegistry[cleanInput(line)[0]];
      if (command) {
        try {
          command.callback(state);
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
