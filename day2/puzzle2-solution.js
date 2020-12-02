/*
The objective is to find how many valid passwords do we have according to their
policy (the character 'char' must appear only once in either pos1 or pos2).
It's quite straight-forward, the only fancy thing is the use of the XOR operator.
Notice also that pos1 and pos2 are 1-indexed, so we need to subtract 1 when
accessing the array.

Complexity with n passwords: 

- Time: O(n)
- Memory: O(1)
*/

const data = require("./input");

let output = 0;

const isPasswordValid = (pos1, pos2, char, password) => {
	return (password[pos1 - 1] == char) ^ (password[pos2 - 1] == char);
};

for (let [pos1, pos2, char, password] of data) {
	if (isPasswordValid(pos1, pos2, char, password)) {
		output++;
	}
}

console.log(output);
