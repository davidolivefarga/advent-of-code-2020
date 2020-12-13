let [_, busIds] = require("./input");

const equationsData = busIds.reduce((data, id, i) => {
	if (id != "x") {
		const mod = id;

		let remainder = mod - i;
		while (remainder < 0) remainder += mod;

		data.push([mod, remainder]);
	}

	return data;
}, []);

const [mod, remainder] = equationsData[0];

let solution = remainder;
let increment = mod;

for (let i = 1; i < equationsData.length; i++) {
	const [mod, remainder] = equationsData[i];

	while (solution % mod != remainder) solution += increment;

	increment *= mod;
}

console.log(solution);
