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
