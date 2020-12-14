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
