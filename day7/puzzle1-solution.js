const bagsContent = require("./input");

let output = 0;

const visited = new Set();
const cache = {};

const containsShinyGold = (bag, visited) => {
	if (!cache[bag]) {
		visited.add(bag);

		const content = bagsContent[bag];

		if (!content) {
			cache[bag] = false;
		} else if (content["shiny gold"]) {
			cache[bag] = true;
		} else {
			cache[bag] = Object.keys(content).some(
				(bag) => !visited.has(bag) && containsShinyGold(bag, visited)
			);
		}

		visited.delete(bag);
	}

	return cache[bag];
};

for (let bag of Object.keys(bagsContent)) {
	if (containsShinyGold(bag, visited)) output++;
}

console.log(output);
