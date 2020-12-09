# Day 9 - Encoding Error

You can find the puzzles [here](https://adventofcode.com/2020/day/9).

## ✍🏼 Input

A list of `n` positive integers.

### Raw input

```
3
17
32
```

### Formatted input

```js
[
	3,
	17,
	32
]
```

## 🧩 First puzzle

### Objective

Starting from the 26th number, we say that a number is valid if it can be expressed as the sum of two of the 25 numbers before it.

Find the first number that is not valid.

### Solution

Quite straightforward, we can use the same strategy from [Day 1](../day1) puzzles.

```js
/*
Complexity:
- Time: O(n)
- Memory: O(1)
*/

const numbers = require("./input");

let output;

for (let i = 25; i < numbers.length; i++) {
	let found = false;

	const data = new Set();

	for (let j = 25 - i; j < i; j++) {
		if (data.has(numbers[i] - numbers[j])) {
			found = true;
			break;
		}

		data.add(numbers[j]);
	}

	if (!found) {
		output = numbers[i];
		break;
	}
}

console.log(output);
```

## 🧩 Second puzzle

### Objective

Given a number `k`, find a continguous range of at least two numbers that sum exactly `k`. Then, find the minimum and maximum numbers of that range and return their sum.

### Solution

The naive solution is to loop over all numbers and, for each of them, start another loop to see if we can sum up to `k`. This would be O(n^2) time, but we can do better.

Using a sliding window / two pointer technique, we can achieve the same but with O(n) time. Imagine that we have a range from position `left` to `right`. If the sum of the elements in this range is smaller than `k`, we increase `right`; otherwise, we increase `left`.

```js
/*
Complexity:
- Time: O(n)
- Memory: O(1)
*/

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
```