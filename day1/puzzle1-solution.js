/*
The objective is to find two different numbers of the input array
that sum 2020 and multiply them. To do this, we can go through the 
array and for each element x we will do the following process:

- If we already visited 2020 - x, we're finished, since x + (2020 - x) = 2020.
- If we haven't visited 2020 - x, we store x as a visited number.

Complexity with n numbers: 

- Time: O(n)
- Memory: O(n)
*/

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
