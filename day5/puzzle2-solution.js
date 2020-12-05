const boardingPasses = require("./input");

let output = 0;

const getId = (boardingPass) => {
	let left = 0,
		right = 127,
		bottom = 0,
		top = 7;

	for (let i = 0; i < 7; i++) {
		const mid = (left + right) >> 1;
		if (boardingPass[i] == "F") right = mid;
		else left = mid + 1;
	}

	for (let i = 7; i < 10; i++) {
		const mid = (bottom + top) >> 1;
		if (boardingPass[i] == "L") top = mid;
		else bottom = mid + 1;
	}

	return left * 8 + bottom;
};

let min = Number.MAX_SAFE_INTEGER;
let max = Number.MIN_SAFE_INTEGER;
let sum = 0;

for (let boardingPass of boardingPasses) {
	const id = getId(boardingPass);

	min = Math.min(min, id);
	max = Math.max(max, id);
	sum += id;
}

output = (max * (max + 1)) / 2 - (min * (min - 1)) / 2 - sum;

console.log(output);
