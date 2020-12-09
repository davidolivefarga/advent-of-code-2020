const numbers = require("./input");

const findContiguousRangeWithTargetSum = (target) => {
	let left = 0;
	let right = 0;
	let sum = numbers[0];

	while (sum != target || right == left) {
		if (sum >= target) sum -= numbers[left++];
		else sum += numbers[++right];
	}

	return [left, right];
};

const findMinMaxFromRange = (left, right) => {
	let min = Number.MAX_SAFE_INTEGER;
	let max = Number.MIN_SAFE_INTEGER;

	for (let i = left; i <= right; i++) {
		min = Math.min(min, numbers[i]);
		max = Math.max(max, numbers[i]);
	}

	return [min, max];
};

const [left, right] = findContiguousRangeWithTargetSum(257342611);
const [min, max] = findMinMaxFromRange(left, right);

const output = min + max;

console.log(output);
