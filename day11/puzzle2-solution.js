let map = require("./input");

const n = map.length;
const m = map[0].length;

const calculateValue = (i, j, map) => {
	if (map[i][j] == ".") return ".";

	let occupiedInSightCount = 0;
	let x, y;

	// In the left-up direction
	(x = i - 1), (y = j - 1);
	while (map[x] && map[x][y] && map[x][y] == ".") (x -= 1), (y -= 1);
	if (map[x] && map[x][y] == "#") occupiedInSightCount++;

	// In the up direction
	(x = i - 1), (y = j);
	while (map[x] && map[x][y] && map[x][y] == ".") x -= 1;
	if (map[x] && map[x][y] == "#") occupiedInSightCount++;

	// In the right-up direction
	(x = i - 1), (y = j + 1);
	while (map[x] && map[x][y] && map[x][y] == ".") (x -= 1), (y += 1);
	if (map[x] && map[x][y] == "#") occupiedInSightCount++;

	// In the right direction
	(x = i), (y = j + 1);
	while (map[x] && map[x][y] && map[x][y] == ".") y += 1;
	if (map[x] && map[x][y] == "#") occupiedInSightCount++;

	// In the right-bottom direction
	(x = i + 1), (y = j + 1);
	while (map[x] && map[x][y] && map[x][y] == ".") (x += 1), (y += 1);
	if (map[x] && map[x][y] == "#") occupiedInSightCount++;

	// In the bottom direction
	(x = i + 1), (y = j);
	while (map[x] && map[x][y] && map[x][y] == ".") x += 1;
	if (map[x] && map[x][y] == "#") occupiedInSightCount++;

	// In the left-bottom direction
	(x = i + 1), (y = j - 1);
	while (map[x] && map[x][y] && map[x][y] == ".") (x += 1), (y -= 1);
	if (map[x] && map[x][y] == "#") occupiedInSightCount++;

	// In the left direction
	(x = i), (y = j - 1);
	while (map[x] && map[x][y] && map[x][y] == ".") y -= 1;
	if (map[x] && map[x][y] == "#") occupiedInSightCount++;

	if (map[i][j] == "L" && occupiedInSightCount == 0) return "#";
	if (map[i][j] == "#" && occupiedInSightCount >= 5) return "L";

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
