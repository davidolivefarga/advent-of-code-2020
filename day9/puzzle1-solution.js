const numbers = require("./input");

let output;

for (let i = 25; i < numbers.length; i++) {
	let found = false;

	const data = new Set();

	for (let j = 25 - i; j < i; j++) {
		if (data.has(numbers[i] - numbers[j])) {
			found = true;
			break;
		}

		data.add(numbers[j]);
	}

	if (!found) {
		output = numbers[i];
		break;
	}
}

console.log(output);
