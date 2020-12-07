const bagsContent = require("./input");

let output = 0;

const bagCount = (bag) => {
	const content = bagsContent[bag];

	if (!content) return 0;

	return Object.entries(content).reduce(
		(count, [bag, amount]) => count + amount * (bagCount(bag) + 1),
		0
	);
};

output = bagCount("shiny gold");

console.log(output);
