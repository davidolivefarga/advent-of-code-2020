const input = require("./input");

let cycles = 6;

const valueByCoordinate = new Map();
const activeNeighborCountByCoordinate = new Map();

const encode = (x, y, z, w) => `${x}@${y}@${z}@${w}`;

const decode = (code) => code.split("@").map((n) => parseInt(n, 10));

const updateActiveNodeNeighbors = (x, y, z, w, map) => {
	const coordinate = encode(x, y, z, w);

	for (let dx = -1; dx <= 1; dx++) {
		for (let dy = -1; dy <= 1; dy++) {
			for (let dz = -1; dz <= 1; dz++) {
				for (let dw = -1; dw <= 1; dw++) {
					const neighborCoordinate = encode(x + dx, y + dy, z + dz, w + dw);

					map.set(neighborCoordinate, (map.get(neighborCoordinate) || 0) + 1);
				}
			}
		}
	}

	map.set(coordinate, map.get(coordinate) - 1);
};

for (let x = 0; x < input.length; x++) {
	for (let y = 0; y < input.length; y++) {
		const coordinate = encode(x, y, 0, 0);

		valueByCoordinate.set(coordinate, input[x][y]);
	}
}

while (cycles-- > 0) {
	activeNeighborCountByCoordinate.clear();

	for (let coordinate of valueByCoordinate.keys()) {
		if (valueByCoordinate.get(coordinate) == "#") {
			const [x, y, z, w] = decode(coordinate);

			updateActiveNodeNeighbors(x, y, z, w, activeNeighborCountByCoordinate);
		}
	}

	for (let coordinate of activeNeighborCountByCoordinate.keys()) {
		if (!valueByCoordinate.has(coordinate)) {
			valueByCoordinate.set(coordinate, ".");
		}

		const currentValue = valueByCoordinate.get(coordinate);
		const activeNeighbors = activeNeighborCountByCoordinate.get(coordinate);

		if (currentValue == "#" && (activeNeighbors < 2 || activeNeighbors > 3)) {
			valueByCoordinate.set(coordinate, ".");
		} else if (currentValue == "." && activeNeighbors == 3) {
			valueByCoordinate.set(coordinate, "#");
		}
	}
}

const output = [...valueByCoordinate.values()].filter((v) => v == "#").length;

console.log(output);
