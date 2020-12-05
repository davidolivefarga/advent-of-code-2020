# Day 5 - Binary Boarding

You can find the puzzles [here](https://adventofcode.com/2020/day/5).

## Input

A list of `n` plane seats, which are represented as a string of 10 characters.

The first 7 characters are either an `F` or a `B`, and are used to encode the seat row number (from 0 to 127). The characters encode the number by using binary search. `F` means taking the lower half and `B` means taking the upper half. For example, with `FBFBBFFRLR` we have:

```
[0, 127] -> [0, 63] -> [32, 63] -> [32, 47] -> [40, 47] -> [44, 47] -> [44, 45] -> [45, 45]
```

The last 3 characters are either an `L` or an `R`, and are used to encode the seat column number (from 0 to 7). The characters encode the number using binary search. `L` means taking the lower half and `R` means taking the upper half. For example, with `RLR` we have:

```
[0, 7] -> [4, 7] -> [4, 5] -> [5, 5]
```

Given a seat with row `r` and column `c`, we can calculate its ID with the formula `8r + c`.

### Raw input

```
BFFFBBFRRR
FFFBBBFRRR
```

### Formatted input

```js
[
    `BFFFBBFRRR`,
    `FFFBBBFRRR`
]
```

## First puzzle

### Objective

Find the plane seat from the list with the highest ID.

### Solution

Code a binary search algorithm following the instructions from the problem statement.

```js
/*
Complexity:
- Time: O(n)
- Memory: O(1)
*/

const boardingPasses = require("./input");

let output = 0;

const getId = (boardingPass) => {
	let left = 0,
		right = 127,
		bottom = 0,
		top = 7;

	for (let i = 0; i < 7; i++) {
		const mid = (left + right) >> 1;
		if (boardingPass[i] == "F") right = mid;
		else left = mid + 1;
	}

	for (let i = 7; i < 10; i++) {
		const mid = (bottom + top) >> 1;
		if (boardingPass[i] == "L") top = mid;
		else bottom = mid + 1;
	}

	return left * 8 + bottom;
};

for (let boardingPass of boardingPasses) {
	output = Math.max(output, getId(boardingPass));
}

console.log(output);
```

## Second puzzle

### Objective

Find the missing plane seat, knowing that some of the seats in the front and some of the seats in the back don't exist. 

It is also guaranteed that the IDs to the left and to the right of the missing ID exist.

### Solution

The naive way to do solve this puzzle is by storing all IDs, sort them and iterate through them to find the missing one. This has time cost `O(nlogn)` and memory cost `O(n)`.

We can do better than that by using some maths 🤓. 

First, notice that we have a sequence of numbers `[m, m + 1, ... , n - 1, n]` that is missing a number.

Consider the following quantities:

- `k`: the sum of all numbers of our sequence
- `S`: the sum of all positive integers from 1 to `n`
- `s`: the sum of all positive integers from 1 to `m - 1`

We know that `S - s` is the sum of all positive numbers from `m` to `n`. Hence, if we subtract from it all the numbers from our original sequence, we will be left out with the missing one. 

That is, our missing ID is `S - s - k`.

Luckily for us, there is [a formula](https://en.wikipedia.org/wiki/1_%2B_2_%2B_3_%2B_4_%2B_%E2%8B%AF) for `S` and `s`. Also, we know that `m` and `n` are the smallest and the biggest IDs of our sequence respectively. This means we can find `m`, `n` and `k` with a single array pass, which has time cost `O(n)` and memory cost `O(1)`.

```js
/*
Complexity:
- Time: O(n)
- Memory: O(1)
*/

const boardingPasses = require("./input");

let output = 0;

const getId = (boardingPass) => {
	let left = 0,
		right = 127,
		bottom = 0,
		top = 7;

	for (let i = 0; i < 7; i++) {
		const mid = (left + right) >> 1;
		if (boardingPass[i] == "F") right = mid;
		else left = mid + 1;
	}

	for (let i = 7; i < 10; i++) {
		const mid = (bottom + top) >> 1;
		if (boardingPass[i] == "L") top = mid;
		else bottom = mid + 1;
	}

	return left * 8 + bottom;
};

let min = Number.MAX_SAFE_INTEGER;
let max = Number.MIN_SAFE_INTEGER;
let sum = 0;

for (let boardingPass of boardingPasses) {
	const id = getId(boardingPass);

	min = Math.min(min, id);
	max = Math.max(max, id);
	sum += id;
}

output = (max * (max + 1)) / 2 - (min * (min - 1)) / 2 - sum;

console.log(output);
```