const map = require("./input");

let output = 0;

const rows = map.length;
const cols = map[0].length;

for (let i = 1; i < rows; i++) {
	if (map[i][(i * 3) % cols] === "#") {
		output++;
	}
}

console.log(output);
