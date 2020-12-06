const formGroups = require("./input");

let output = 0;

const availableQuestions = "abcdefghijklmnopqrstuvwxyz".split("");

for (let formGroup of formGroups) {
	const formCount = formGroup.length;
	const questionCount = {};

	for (let form of formGroup) {
		for (let question of form) {
			questionCount[question] = (questionCount[question] || 0) + 1;
		}
	}

	availableQuestions.forEach((question) => {
		if (questionCount[question] == formCount) {
			output++;
		}
	});
}

console.log(output);
