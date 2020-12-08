# Day 8 - Handheld Halting

You can find the puzzles [here](https://adventofcode.com/2020/day/8).

## ✍🏼 Input

A list of `n` instructions. An instruction has two parts, a type and a value. There are three types:

- `acc`: add the value to the accumulator (initialised to 0)
- `jmp`: jump to a new instruction relative to the current one
- `nop`: do nothing

### Raw input

```
nop +0
acc -1
jmp +4
```

### Formatted input

```js
[
	['nop', 0],
	['acc', -1],
	['jmp', 4]
]
```

## 🧩 First puzzle

### Objective

The list of instructions is guaranteed to go into an infinite loop. Find the value of the accumulator before we start repeating the loop.

### Solution

Use recursion to iterate through the instructions, and use a set to keep track of the visited instructions.

```js
/*
Complexity:
- Time: O(n)
- Memory: O(n)
*/

const instructions = require("./input");

const visitedInstructions = new Set();

const calculateAcc = (acc, instruction) => {
	if (visitedInstructions.has(instruction)) return acc;

	visitedInstructions.add(instruction);

	const [type, amount] = instructions[instruction];

	switch (type) {
		case "acc":
			return calculateAcc(acc + amount, instruction + 1);
		case "jmp":
			return calculateAcc(acc, instruction + amount);
		case "nop":
			return calculateAcc(acc, instruction + 1);
	}
};

const output = calculateAcc(0, 0);

console.log(output);
```

## 🧩 Second puzzle

### Objective

The infinite loop can be prevented by changing exactly one `jmp` instruction to a `nop` instruction or viceversa. Find the value of the accumulator after the program terminates. The program terminates when it attempts to execute an instruction immediately after the last instruction.

### Solution

Again, use recursion and a set to keep track of the visited instructions. However, there are a few modifications:

- We add a new parameter to keep track if we already changed an instruction or not. If we did, the code behaves the same as in the first puzzle; if we didn't, we may consider an extra path when we reach a `jmp` or `nop` instruction.
- Since our recursion might split into different branches, we need to _unvisit_ instructions whenever we reach an invalid path (one that goes into an infinite loop).

```js
/*
Complexity:
- Time: O(n^2)
- Memory: O(n)
*/

const instructions = require("./input");

const terminateInstruction = instructions.length;
const visitedInstructions = new Set();

const calculateAcc = (acc, instruction, changeDone) => {
	if (instruction == terminateInstruction) return acc;
	if (visitedInstructions.has(instruction)) return null;

	visitedInstructions.add(instruction);

	const [type, amount] = instructions[instruction];

	let accResult;

	switch (type) {
		case "acc":
			accResult = calculateAcc(acc + amount, instruction + 1, changeDone);
			break;
		case "jmp":
			accResult = calculateAcc(acc, instruction + amount, changeDone);
			if (accResult === null && !changeDone) {
				accResult = calculateAcc(acc, instruction + 1, true);
			}
			break;
		case "nop":
			accResult = calculateAcc(acc, instruction + 1, changeDone);
			if (accResult === null && !changeDone) {
				accResult = calculateAcc(acc, instruction + amount, true);
			}
			break;
	}

	if (!accResult) {
		visitedInstructions.delete(instruction);
	}

	return accResult;
};

const output = calculateAcc(0, 0, false);

console.log(output);
```