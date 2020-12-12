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
