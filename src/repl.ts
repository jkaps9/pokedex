import { createInterface } from "node:readline";

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
      console.log(`Your command was: ${cleanInput(line)[0]}`);
    }
    rl.prompt();
  });
}
