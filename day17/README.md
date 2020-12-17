# Day 17: Ticket Translation

You can find the puzzles [here](https://adventofcode.com/2020/day/17).

## ✍🏼 Input

A square matrix of size `n`, representing a map with two possible values:

- `#`: active node
- `.`: inactive node

### Raw input

```
.#.
..#
###
```

### Formatted input

```js
[
	['.', '#', '.'],
	['.', '.', '#'],
	['#', '#', '#']
]
```

## 🧩 First puzzle

### Objective

Assume the input matrix represents 3-D coordinates of the form `(x, y, 0)`, an play the following iterative game:

- If a node in a coordinate is active and has less than 2 or more than 3 active neighbors, it becomes inactive
- If a node in a coordinate is inactive and has exactly 3 active neighbors, it becomes active

The neighbors of a node are the immediate nodes in all directions (a total of 26).

Calculate the amount of active nodes after 6 iterations.

### Solution

The puzzle difficulty is increasing! This is a more complicated version of [Day 11 - Puzzle 1](../day11/README.md#first-puzzle).

At first, I attempted a similar strategy as the puzzle from Day 11, we as we're now playing with 3 dimensions, the code became very verbose. Yes, it worked, but I didn't feel comfortable creating maps holding maps that hold more maps, getting a coordinate from there was a mess. To avoid this huge amount of maps, I decided to encode a coordinate `(x, y z)` as `x@y@z`. This way, each coordinate has a unique code and this means I can use a single map to store them (at the price of constantly coding/encoding coordinates, but it is a price worth paying to keep the code small, simple and easy to read).

Now that we can store our coordinates in a single map, these are the steps we need to do in each iteration:

- Count the amount of active neighbors for each node that has at least one active neighbour
- Then, apply the game rules and update the map accordingly

The tricky step, in my opinion, is the first one. Instead of saying: 'given a node, inspect its neighbors and count how many of them are active', what I did was 'given an active node, for each of its neighbors update their count of active neighbors'. This inversion let me keep simple and efficient code, so that I only check exactly what I need to.

```js
/*
Complexity:
- Time: O(n^3)
- Memory: O(n^3)
*/

const input = require("./input");

let cycles = 6;

const valueByCoordinate = new Map();
const activeNeighborCountByCoordinate = new Map();

const encode = (x, y, z) => `${x}@${y}@${z}`;

const decode = (code) => code.split("@").map((n) => parseInt(n, 10));

const updateActiveNodeNeighbors = (x, y, z, map) => {
	const coordinate = encode(x, y, z);

	for (let dx = -1; dx <= 1; dx++) {
		for (let dy = -1; dy <= 1; dy++) {
			for (let dz = -1; dz <= 1; dz++) {
				const neighborCoordinate = encode(x + dx, y + dy, z + dz);

				map.set(neighborCoordinate, (map.get(neighborCoordinate) || 0) + 1);
			}
		}
	}

	map.set(coordinate, map.get(coordinate) - 1);
};

for (let x = 0; x < input.length; x++) {
	for (let y = 0; y < input.length; y++) {
		const coordinate = encode(x, y, 0);

		valueByCoordinate.set(coordinate, input[x][y]);
	}
}

while (cycles-- > 0) {
	activeNeighborCountByCoordinate.clear();

	for (let coordinate of valueByCoordinate.keys()) {
		if (valueByCoordinate.get(coordinate) == "#") {
			const [x, y, z] = decode(coordinate);

			updateActiveNodeNeighbors(x, y, z, activeNeighborCountByCoordinate);
		}
	}

	for (let coordinate of activeNeighborCountByCoordinate.keys()) {
		if (!valueByCoordinate.has(coordinate)) {
			valueByCoordinate.set(coordinate, ".");
		}

		const currentValue = valueByCoordinate.get(coordinate);
		const activeNeighbors = activeNeighborCountByCoordinate.get(coordinate);

		if (currentValue == "#" && (activeNeighbors < 2 || activeNeighbors > 3)) {
			valueByCoordinate.set(coordinate, ".");
		} else if (currentValue == "." && activeNeighbors == 3) {
			valueByCoordinate.set(coordinate, "#");
		}
	}
}

const output = [...valueByCoordinate.values()].filter((v) => v == "#").length;

console.log(output);
```

## 🧩 Second puzzle

### Objective

Play the same game as in the first puzzle, but now in a 4-dimensional space.

This means that the input coordinates are now of the form `(x, y, 0, 0)`.

Calculate the amount of active nodes after 6 iterations.

### Solution

It paid off spending some time on creating simple, reusable code. We simply need to add an extra dimension wherever it is required.

```js
/*
Complexity:
- Time: O(n^4)
- Memory: O(n^4)
*/

const input = require("./input");

let cycles = 6;

const valueByCoordinate = new Map();
const activeNeighborCountByCoordinate = new Map();

const encode = (x, y, z, w) => `${x}@${y}@${z}@${w}`;

const decode = (code) => code.split("@").map((n) => parseInt(n, 10));

const updateActiveNodeNeighbors = (x, y, z, w, map) => {
	const coordinate = encode(x, y, z, w);

	for (let dx = -1; dx <= 1; dx++) {
		for (let dy = -1; dy <= 1; dy++) {
			for (let dz = -1; dz <= 1; dz++) {
				for (let dw = -1; dw <= 1; dw++) {
					const neighborCoordinate = encode(x + dx, y + dy, z + dz, w + dw);

					map.set(neighborCoordinate, (map.get(neighborCoordinate) || 0) + 1);
				}
			}
		}
	}

	map.set(coordinate, map.get(coordinate) - 1);
};

for (let x = 0; x < input.length; x++) {
	for (let y = 0; y < input.length; y++) {
		const coordinate = encode(x, y, 0, 0);

		valueByCoordinate.set(coordinate, input[x][y]);
	}
}

while (cycles-- > 0) {
	activeNeighborCountByCoordinate.clear();

	for (let coordinate of valueByCoordinate.keys()) {
		if (valueByCoordinate.get(coordinate) == "#") {
			const [x, y, z, w] = decode(coordinate);

			updateActiveNodeNeighbors(x, y, z, w, activeNeighborCountByCoordinate);
		}
	}

	for (let coordinate of activeNeighborCountByCoordinate.keys()) {
		if (!valueByCoordinate.has(coordinate)) {
			valueByCoordinate.set(coordinate, ".");
		}

		const currentValue = valueByCoordinate.get(coordinate);
		const activeNeighbors = activeNeighborCountByCoordinate.get(coordinate);

		if (currentValue == "#" && (activeNeighbors < 2 || activeNeighbors > 3)) {
			valueByCoordinate.set(coordinate, ".");
		} else if (currentValue == "." && activeNeighbors == 3) {
			valueByCoordinate.set(coordinate, "#");
		}
	}
}

const output = [...valueByCoordinate.values()].filter((v) => v == "#").length;

console.log(output);
```