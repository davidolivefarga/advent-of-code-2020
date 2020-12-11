# Day 11 - Seating System

You can find the puzzles [here](https://adventofcode.com/2020/day/11).

## ✍🏼 Input

A matrix with `n` rows and `m` columns representing a map. There are three possible values:

- `.`: floor
- `L`: empty seat
- `#`: occupied seat

### Raw input

```
#.L
#LL
L.L
```

### Formatted input

```js
[
	['#', '.', 'L'],
	['#', 'L', 'L'],
	['L', '.', 'L']
]
```

## 🧩 First puzzle

### Objective

Apply transformations to the map until it becomes stable. Then, count how many occupied seats it contains.

A transformation is applied to each map value, using the following rules:

- If a seat is empty and has no occupied seats around it, it becomes occupied
- If a seat is occupied and has four or more seats occupied around it, it becomes empty

For this puzzle, _around it_ means that is adjacent in one of the 8 directions.

### Solution

Straightforward and ugly solution, nothing to add. It could be improved to avoid creating new maps on every loop (for example, storing the changes in an array and then update the map), but I was too lazy to do that.

```js
/*
Complexity:
- Time: O(n^2)
- Memory: O(n^2)
*/

let map = require("./input");

const n = map.length;
const m = map[0].length;

const calculateValue = (i, j, map) => {
	if (map[i][j] == ".") return ".";

	let adjacentOccupiedCount = 0;

	if (map[i - 1] && map[i - 1][j - 1] == "#") adjacentOccupiedCount++;
	if (map[i - 1] && map[i - 1][j] == "#") adjacentOccupiedCount++;
	if (map[i - 1] && map[i - 1][j + 1] == "#") adjacentOccupiedCount++;
	if (map[i][j - 1] == "#") adjacentOccupiedCount++;
	if (map[i][j + 1] == "#") adjacentOccupiedCount++;
	if (map[i + 1] && map[i + 1][j - 1] == "#") adjacentOccupiedCount++;
	if (map[i + 1] && map[i + 1][j] == "#") adjacentOccupiedCount++;
	if (map[i + 1] && map[i + 1][j + 1] == "#") adjacentOccupiedCount++;

	if (map[i][j] == "L" && adjacentOccupiedCount == 0) return "#";
	if (map[i][j] == "#" && adjacentOccupiedCount >= 4) return "L";

	return map[i][j];
};

let stable = false;

while (!stable) {
	stable = true;

	const newMap = Array.from(Array(n), () => new Array(m));

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < m; j++) {
			const currentValue = map[i][j];
			const newValue = calculateValue(i, j, map);

			newMap[i][j] = newValue;

			if (currentValue != newValue) {
				stable = false;
			}
		}
	}

	if (!stable) {
		map = newMap;
	}
}

let output = 0;

for (let i = 0; i < n; i++) {
	for (let j = 0; j < m; j++) {
		if (map[i][j] == "#") output++;
	}
}

console.log(output);
```

## 🧩 Second puzzle

### Objective

Apply transformations to the map until it becomes stable. Then, count how many occupied seats it contains.

A transformation is applied to each map value, using the following rules:

- If a seat is empty and has no occupied seats around it, it becomes occupied
- If a seat is occupied and has four or more seats occupied around it, it becomes empty

For this puzzle, _around it_ means the first seat that can be seen in each of the 8 directions.

### Solution

Same as before, straightforward and ugly solution. I could probably reduce the amount of code to reuse some logic, but I was too lazy.

```js
/*
Complexity:
- Time: O(n^2)
- Memory: O(n^2)
*/

let map = require("./input");

const n = map.length;
const m = map[0].length;

const calculateValue = (i, j, map) => {
	if (map[i][j] == ".") return ".";

	let occupiedInSightCount = 0;
	let x, y;

	// In the left-up direction
	(x = i - 1), (y = j - 1);
	while (map[x] && map[x][y] && map[x][y] == ".") (x -= 1), (y -= 1);
	if (map[x] && map[x][y] == "#") occupiedInSightCount++;

	// In the up direction
	(x = i - 1), (y = j);
	while (map[x] && map[x][y] && map[x][y] == ".") x -= 1;
	if (map[x] && map[x][y] == "#") occupiedInSightCount++;

	// In the right-up direction
	(x = i - 1), (y = j + 1);
	while (map[x] && map[x][y] && map[x][y] == ".") (x -= 1), (y += 1);
	if (map[x] && map[x][y] == "#") occupiedInSightCount++;

	// In the right direction
	(x = i), (y = j + 1);
	while (map[x] && map[x][y] && map[x][y] == ".") y += 1;
	if (map[x] && map[x][y] == "#") occupiedInSightCount++;

	// In the right-bottom direction
	(x = i + 1), (y = j + 1);
	while (map[x] && map[x][y] && map[x][y] == ".") (x += 1), (y += 1);
	if (map[x] && map[x][y] == "#") occupiedInSightCount++;

	// In the bottom direction
	(x = i + 1), (y = j);
	while (map[x] && map[x][y] && map[x][y] == ".") x += 1;
	if (map[x] && map[x][y] == "#") occupiedInSightCount++;

	// In the left-bottom direction
	(x = i + 1), (y = j - 1);
	while (map[x] && map[x][y] && map[x][y] == ".") (x += 1), (y -= 1);
	if (map[x] && map[x][y] == "#") occupiedInSightCount++;

	// In the left direction
	(x = i), (y = j - 1);
	while (map[x] && map[x][y] && map[x][y] == ".") y -= 1;
	if (map[x] && map[x][y] == "#") occupiedInSightCount++;

	if (map[i][j] == "L" && occupiedInSightCount == 0) return "#";
	if (map[i][j] == "#" && occupiedInSightCount >= 5) return "L";

	return map[i][j];
};

let stable = false;

while (!stable) {
	stable = true;

	const newMap = Array.from(Array(n), () => new Array(m));

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < m; j++) {
			const currentValue = map[i][j];
			const newValue = calculateValue(i, j, map);

			newMap[i][j] = newValue;

			if (currentValue != newValue) {
				stable = false;
			}
		}
	}

	if (!stable) {
		map = newMap;
	}
}

let output = 0;

for (let i = 0; i < n; i++) {
	for (let j = 0; j < m; j++) {
		if (map[i][j] == "#") output++;
	}
}

console.log(output);
```