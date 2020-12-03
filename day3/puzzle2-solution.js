const map = require("./input");

let output = 1;

const rows = map.length;
const cols = map[0].length;

const countTrees = (right, down) => {
	let count = 0;

	for (let i = down; i < rows; i += down) {
		if (map[i][((i / down) * right) % cols] === "#") {
			count++;
		}
	}

	return count;
};

output *= countTrees(1, 1);
output *= countTrees(3, 1);
output *= countTrees(5, 1);
output *= countTrees(7, 1);
output *= countTrees(1, 2);

console.log(output);
