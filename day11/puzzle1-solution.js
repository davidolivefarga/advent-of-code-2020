let map = require("./input");

const n = map.length;
const m = map[0].length;

const calculateValue = (i, j, map) => {
	if (map[i][j] == ".") return ".";

	let adjacentOccupiedCount = 0;

	if (map[i - 1] && map[i - 1][j - 1] == "#") adjacentOccupiedCount++;
	if (map[i - 1] && map[i - 1][j] == "#") adjacentOccupiedCount++;
	if (map[i - 1] && map[i - 1][j + 1] == "#") adjacentOccupiedCount++;
	if (map[i][j - 1] == "#") adjacentOccupiedCount++;
	if (map[i][j + 1] == "#") adjacentOccupiedCount++;
	if (map[i + 1] && map[i + 1][j - 1] == "#") adjacentOccupiedCount++;
	if (map[i + 1] && map[i + 1][j] == "#") adjacentOccupiedCount++;
	if (map[i + 1] && map[i + 1][j + 1] == "#") adjacentOccupiedCount++;

	if (map[i][j] == "L" && adjacentOccupiedCount == 0) return "#";
	if (map[i][j] == "#" && adjacentOccupiedCount >= 4) return "L";

	return map[i][j];
};

let stable = false;

while (!stable) {
	stable = true;

	const newMap = Array.from(Array(n), () => new Array(m));

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < m; j++) {
			const currentValue = map[i][j];
			const newValue = calculateValue(i, j, map);

			newMap[i][j] = newValue;

			if (currentValue != newValue) {
				stable = false;
			}
		}
	}

	if (!stable) {
		map = newMap;
	}
}

let output = 0;

for (let i = 0; i < n; i++) {
	for (let j = 0; j < m; j++) {
		if (map[i][j] == "#") output++;
	}
}

console.log(output);
