const instructions = require("./input");

const terminateInstruction = instructions.length;
const visitedInstructions = new Set();

const calculateAcc = (acc, instruction, changeDone) => {
	if (instruction == terminateInstruction) return acc;
	if (visitedInstructions.has(instruction)) return null;

	visitedInstructions.add(instruction);

	const [type, amount] = instructions[instruction];

	let accResult;

	switch (type) {
		case "acc":
			accResult = calculateAcc(acc + amount, instruction + 1, changeDone);
			break;
		case "jmp":
			accResult = calculateAcc(acc, instruction + amount, changeDone);
			if (accResult === null && !changeDone) {
				accResult = calculateAcc(acc, instruction + 1, true);
			}
			break;
		case "nop":
			accResult = calculateAcc(acc, instruction + 1, changeDone);
			if (accResult === null && !changeDone) {
				accResult = calculateAcc(acc, instruction + amount, true);
			}
			break;
	}

	if (!accResult) {
		visitedInstructions.delete(instruction);
	}

	return accResult;
};

const output = calculateAcc(0, 0, false);

console.log(output);
