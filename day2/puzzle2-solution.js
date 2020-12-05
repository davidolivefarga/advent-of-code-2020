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
