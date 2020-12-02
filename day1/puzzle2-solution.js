/*
The objective is to find three different numbers of the input array
that sum 2020 and multiply them. To do this, we can reuse the same
approach as in puzzle 1. We can go through the array and for each
element x we will do the following process:

- Check if there are two numbers different than x that sum 2020 - x
  (notice this is the same calculation as in puzzle 1). If we do,
  we're finished and we just need to multiply them.

Complexity with n numbers:

- Time: O(n^2)
- Memory: O(n)
*/

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
