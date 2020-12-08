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
