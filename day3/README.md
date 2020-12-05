# Day 3 - Tobbogan Trajectory

You can find the puzzles [here](https://adventofcode.com/2020/day/3).

## Input

A matrix of `n` rows and `m` columns representing a map, which can have two values:

- `.`: empty square
- `#`: occupied square

The starting position `(0, 0)` is guaranteed to be an empty square.

The map extends infinitely to the right by copying itself.

### Raw input

```
..##.
#...#
```

### Formatted input

```js
[
    ['.', '.', '#', '#', '.'],
    ['#', '.', '.', '.', '#']
]
```

## First puzzle

### Objective

Count the amount occupied squares that we visit from the starting position to the last row, following the slope `3 right, 1 down`.

### Solution

Check all positions of the form `(i, 3i)`, with `0 < i < n`. Since it is possible that `3i >= m` for some values of `i`, we actually need to check positions of the form `(i, 3i % m)` (remember that the map extends infinitely to the right by copying itself).

```js
/*
Complexity:
- Time: O(n)
- Memory: O(1)
*/

const map = require("./input");

let output = 0;

const rows = map.length;
const cols = map[0].length;

for (let i = 1; i < rows; i++) {
	if (map[i][(i * 3) % cols] === "#") {
		output++;
	}
}

console.log(output);
```

## Second puzzle

### Objective

Count the amount occupied squares that we visit from the starting position to the last row, following the slope `r right, d down`.

### Solution

Generalise the position formula of the first puzzle. The positions will be of the form `(di, ri)` with `0 < i < n/r`. Again, to prevent going out of bound for the second coordinate, we actually need to check positions of the form `(di, ri % m)`.

```js
/*
Complexity:
- Time: O(n)
- Memory: O(1)
*/

const map = require("./input");

let output = 1;

const rows = map.length;
const cols = map[0].length;

const countTrees = (right, down) => {
	let count = 0;

	for (let i = down; i < rows; i += down) {
		if (map[i][((i / down) * right) % cols] === "#") {
			count++;
		}
	}

	return count;
};

output *= countTrees(1, 1);
output *= countTrees(3, 1);
output *= countTrees(5, 1);
output *= countTrees(7, 1);
output *= countTrees(1, 2);

console.log(output);
```