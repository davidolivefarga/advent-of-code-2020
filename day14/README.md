# Day 14: Docking Data

You can find the puzzles [here](https://adventofcode.com/2020/day/14).

## ✍🏼 Input

A list of `n` instructions. There are two type of instructions:

- `mask`: set a 36-bit mask, consisting on characters `0`, `1` or `X`
- `mem`: add a value `v` to a memory position `p`

### Raw input

```
mask = 0000011011111X1001100X0001X1001100X0
mem[43805] = 6934
mem[57564] = 3741
```

### Formatted input

```js
[
   ['mask', '0000011011111X1001100X0001X1001100X0'],
   ['mem', 43805, 6934],
   ['mem', 57564, 3741]
]
```

## 🧩 First puzzle

### Objective

Every time we are going to store a value `v` in a position `p`, first we apply the mask to the binary expression of `v`, following these rules:

- `0`: override the bit with a `0`
- `1`: override the bit with a `1`
- `X`: keep the bit in `v`

Find the sum of all numbers stored in the memory after all the instructions finish.

### Solution

Quite straightforward, you only to know the language syntax to be able to transform numbers from decimal to binary or viceversa.

```js
/*
Complexity:
- Time: O(n)
- Memory: O(n)
*/

const instructions = require("./input");

const memory = {};

let mask;

for (let instruction of instructions) {
	if (instruction[0] == "mask") {
		mask = instruction[1];
	} else {
		const memoryPos = instruction[1];
		const value = instruction[2];

		const valueAsBinArray = value.toString(2).padStart(36, "0").split("");

		for (let i = 0; i < 36; i++) {
			if (mask[i] == "0") valueAsBinArray[i] = "0";
			else if (mask[i] == "1") valueAsBinArray[i] = "1";
		}

		const result = parseInt(valueAsBinArray.join(""), 2);

		memory[memoryPos] = result;
	}
}

const output = Object.values(memory).reduce((acc, curr) => acc + curr, 0);

console.log(output);
```

## 🧩 Second puzzle

### Objective

Every time we are going to store a value `v` in a position `p`, first we apply the mask to the binary expression of `m`, following these rules:

- `0`: keep the bit in `m`
- `1`: override the bit with a `1`
- `X`: can be either a `0` or a `1`

Since `X` can have two values, we will actually have multiple memory positions. For example, `X0X` would give four possibilities: `000`, `001`, `100` and `101`.

Find the sum of all numbers stored in the memory after all the instructions finish.

### Solution

Now the tricky part is to generate all possible values of `m`. This can be done in different ways, but I chose to use recursion. If we encounter an `X`, we branch our code: we put a `0` and iterate over the next bit and we put a `1` and iterate over the next bit.

```js
/*
Complexity:
- Time: O(n)
- Memory: O(n)
*/

const instructions = require("./input");

const calculateMemoryPositions = (i, current, mask, memoryPositions) => {
	if (i == 36) {
		memoryPositions.push(parseInt(current.join(""), 2));
		return;
	}

	if (mask[i] == "0") {
		calculateMemoryPositions(i + 1, current, mask, memoryPositions);
	} else if (mask[i] == "1") {
		current[i] = "1";
		calculateMemoryPositions(i + 1, current, mask, memoryPositions);
	} else if (mask[i] == "X") {
		current[i] = "0";
		calculateMemoryPositions(i + 1, current, mask, memoryPositions);
		current[i] = "1";
		calculateMemoryPositions(i + 1, current, mask, memoryPositions);
	}
};

const memory = {};

let mask;

for (let instruction of instructions) {
	if (instruction[0] == "mask") {
		mask = instruction[1];
	} else {
		const base = instruction[1];
		const value = instruction[2];

		const baseAsBinArray = base.toString(2).padStart(36, "0").split("");

		const memoryPositions = [];

		calculateMemoryPositions(0, baseAsBinArray, mask, memoryPositions);

		for (let memoryPosition of memoryPositions) {
			memory[memoryPosition] = value;
		}
	}
}

const output = Object.values(memory).reduce((acc, curr) => acc + curr, 0);

console.log(output);
```