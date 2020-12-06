const formGroups = require("./input");

let output = 0;

for (let formGroup of formGroups) {
	const questions = new Set();

	for (let form of formGroup) {
		for (let question of form) {
			questions.add(question);
		}

		if (questions.length == 26) {
			break;
		}
	}

	output += questions.size;
}

console.log(output);
