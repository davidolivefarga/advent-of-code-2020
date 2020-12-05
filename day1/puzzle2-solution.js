const nums = require("./input");

let output;

for (let i = 0; i < nums.length; i++) {
	const target = 2020 - nums[i];
	const visited = {};

	for (let j = i + 1; j < nums.length; j++) {
		if (visited[target - nums[j]]) {
			output = nums[i] * nums[j] * (target - nums[j]);
			break;
		} else {
			visited[nums[j]] = true;
		}
	}

	if (output) {
		break;
	}
}

console.log(output);
