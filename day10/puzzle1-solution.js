const artifacts = require("./input");

artifacts.sort((a, b) => a - b);

artifacts.unshift(0);
artifacts.push(artifacts[artifacts.length - 1] + 3);

const n = artifacts.length;

let diff1Count = 0;
let diff3Count = 0;

for (let i = 1; i < n; i++) {
	const diff = artifacts[i] - artifacts[i - 1];

	if (diff == 1) diff1Count++;
	else if (diff == 3) diff3Count++;
}

const output = diff1Count * diff3Count;

console.log(output);
