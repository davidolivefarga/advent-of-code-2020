# Day 1 - Report Repair

You can find the puzzles [here](https://adventofcode.com/2020/day/1).

## ✍🏼 Input

A list of `n` positive integers.

### Raw input

```
1721
266
299
33
```

### Formatted input

```js
[
    1721,
    266,
    299,
    33
]
```

## 🧩 First puzzle

### Objective

Find two numbers `a` and `b` such that `a + b = 2020`. Then, compute `ab`.

### Solution

Go through the array keep track of all the visited numbers. If for some number `num` we already visited `2020 - num` we're finished, since we found two numbers `a = num` and `b = 2020 - num` that sum 2020.

```js
/*
Complexity:
- Time: O(n)
- Memory: O(n)
*/

const nums = require("./input");

let output;

const visited = {};

for (let num of nums) {
	if (visited[2020 - num]) {
		output = num * (2020 - num);
		break;
	} else {
		visited[num] = true;
	}
}

console.log(output);
```

## 🧩 Second puzzle

### Objective

Find three numbers `a`, `b` and `c` such that `a + b + c = 2020`. Then, compute `abc`.

### Solution

Go through the array. For each number `num` we can create a sub-problem of finding two other numbers that sum `2020 - num`. This sub-problem can be solved using the same strategy as in the first puzzle.

To avoid repeating combinations, if `a` is on index `i`, we'll only look for `b` and `c` candidates on indices `j` such that `j > i`.

```js
/*
Complexity:
- Time: O(n^2)
- Memory: O(n^2)
*/

const nums = require("./input");

let output;

for (let i = 0; i < nums.length; i++) {
	const target = 2020 - nums[i];
	const visited = {};

	for (let j = i + 1; j < nums.length; j++) {
		if (visited[target - nums[j]]) {
			output = nums[i] * nums[j] * (target - nums[j]);
			break;
		} else {
			visited[nums[j]] = true;
		}
	}

	if (output) {
		break;
	}
}

console.log(output);
```