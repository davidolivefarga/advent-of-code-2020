# Day 11 - Rain Risk

You can find the puzzles [here](https://adventofcode.com/2020/day/12).

## ✍🏼 Input

A list of `n` instructions. An instruction is represented by a letter and a positive integer.

### Raw input

```
R180
E1
N1
R90
```

### Formatted input

```js
[
	['R', 180],
	['E', 1],
	['N', 1],
	['R', 90]
]
```

## 🧩 First puzzle

### Objective

Find the final position of a ship starting at `(0, 0)` knowing that:

- N means to move north by the given value
- S means to move south by the given value
- E means to move east by the given value
- W means to move west by the given value
- L means to turn left the given number of degrees
- R means to turn right the given number of degrees
- F means to move forward by the given value in the direction the ship is currently facing

### Solution

Straightforward solution, the only interesting thing is the rotation methods.

Notice that the four directions form a cycle: `N -> E -> S -> W -> N -> ...`. We can then understand a rotation as a movement in this cycle. A movement in the cycle corresponds to a 90 degrees rotation. For example, if we're in E and want to rotate right 270 degrees, we need to move three steps right in the cycle, which would leave us in N.

```js
/*
Complexity:
- Time: O(n)
- Memory: O(1)
*/

const instructions = require("./input");

const directions = ["N", "E", "S", "W"];

let direction = "E";

let north = 0;
let east = 0;

const rotateLeft = (degrees) => {
	const delta = degrees / 90;
	const i = directions.findIndex((d) => d === direction);

	direction = directions[(i - delta + 4) % 4];
};

const rotateRight = (degrees) => {
	const delta = degrees / 90;
	const i = directions.findIndex((d) => d === direction);

	direction = directions[(i + delta + 4) % 4];
};

const executeInstruction = (instruction) => {
	const [type, value] = instruction;

	switch (type) {
		case "N":
			north += value;
			break;
		case "S":
			north -= value;
			break;
		case "E":
			east += value;
			break;
		case "W":
			east -= value;
			break;
		case "F":
			executeInstruction([direction, value]);
			break;
		case "L":
			rotateLeft(value);
			break;
		case "R":
			rotateRight(value);
			break;
	}
};

for (instruction of instructions) {
	executeInstruction(instruction);
}

const output = Math.abs(north) + Math.abs(east);

console.log(output);
```

## 🧩 Second puzzle

### Objective

Find the final position of a ship starting at `(0, 0)` with a waypoint relative to its position starting at `(1, 10)`, knowing that:

- N means to move the waypoint north by the given value
- S means to move the waypoint south by the given value
- E means to move the waypoint east by the given value
- W means to move the waypoint west by the given value
- L means to rotate the waypoint around the ship left (counter-clockwise) the given number of degrees
- R means to rotate the waypoint around the ship right (clockwise) the given number of degrees
- F means to move forward to the waypoint a number of times equal to the given value

### Solution

Again, pretty straighforward solution, the only interesting part is the rotations.

This time, we need to rotate the waypoint coordiates `(wn, we)` around the ship coordinates, which in the waypoint system of reference are `(0, 0)`. The simplest approach to this is to first consider how the coordinates are transformed with a 90 degrees rotation. Then, other rotations consist on repeating that step (for example, rotating right 270 degrees is the same as rotating right 90 degrees three times). If you make a drawing and try some numbers, you will quickly see that:

- Rotate right 90 degrees: (wn, we) -> (-we, wn)
- Rotate left 90 degrees: (wn, we) -> (we, -wn)

While solving the puzzles I noticed that I was interpreting my coordinates as (north, east), but it feels more natural to use (east, north), to mimic the x and y coordinates. However, I was too lazy to change the code, so I adapted to these _rotated_ coordinates.

```js
/*
Complexity:
- Time: O(n)
- Memory: O(1)
*/

const instructions = require("./input");

let shipNorth = 0;
let shipEast = 0;

let waypointNorth = 1;
let waypointEast = 10;

const rotateLeft = (degrees) => {
	const delta = (degrees / 90) % 4;

	for (let i = 0; i < delta; i++) {
		const temp = waypointNorth;
		waypointNorth = waypointEast;
		waypointEast = temp * -1;
	}
};

const rotateRight = (degrees) => {
	const delta = (degrees / 90) % 4;

	for (let i = 0; i < delta; i++) {
		const temp = waypointNorth;
		waypointNorth = waypointEast * -1;
		waypointEast = temp;
	}
};

const executeInstruction = (instruction) => {
	const [type, value] = instruction;

	switch (type) {
		case "N":
			waypointNorth += value;
			break;
		case "S":
			waypointNorth -= value;
			break;
		case "E":
			waypointEast += value;
			break;
		case "W":
			waypointEast -= value;
			break;
		case "F":
			shipNorth += waypointNorth * value;
			shipEast += waypointEast * value;
			break;
		case "L":
			rotateLeft(value);
			break;
		case "R":
			rotateRight(value);
			break;
	}
};

for (instruction of instructions) {
	executeInstruction(instruction);
}

const output = Math.abs(shipNorth) + Math.abs(shipEast);

console.log(output);
```