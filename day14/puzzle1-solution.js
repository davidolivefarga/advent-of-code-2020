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
