const nums = require("./input");

let output;

const visited = {};

for (let num of nums) {
	if (visited[2020 - num]) {
		output = num * (2020 - num);
		break;
	} else {
		visited[num] = true;
	}
}

console.log(output);
