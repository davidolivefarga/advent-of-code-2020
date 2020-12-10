# Day 10 - Adapter Array

You can find the puzzles [here](https://adventofcode.com/2020/day/10).

## ✍🏼 Input

A list of `n` positive integers representing power adapters.

Besides that, you also have a charging outlet that has value `0` and a device that has value `max(list) + 3`.

We can connect `artifact[i]` and `artifact[j]` (`i < j`) if and only if `1 <= artifact[j] - artifact[i] <= 3`.

### Raw input

```
153
17
45
```

### Formatted input

```js
[
	153,
	17,
	45
]
```

## 🧩 First puzzle

### Objective

Calculate the amount of 1-differences and 3-differences when all artifacts (charging outlet, power adapters and device) are connected. 

### Solution

Given the required condition for artifacts to connect, if we want to use all power adapters they need to be sorted from small to big. Then, we also need to include the charging outlet and the device, which by definition they will be the first and last artifact of the artifact list).

Now that we have the artifact list, we just need to iterate through it and count the amount of 1-differences and 3-differences.

```js
/*
Complexity:
- Time: O(nlog(n))
- Memory: O(1)
*/

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
```

## 🧩 Second puzzle

### Objective

Count the different ways we can arrange the power outlets so that the charging device and the power outlet are connected.

### Solution

Start with the same setup as in the first puzzle (a list of sorted artifacts including the charging device and the power outlet).

For any artifact, we have two options: include it or not. If we want to iterate through all the possibilities of including/excluding every artifact, then we would have a memory complexity of O(2^n), which is pretty bad.

We can do better using dynamic programming, which consists on three things:

- Find a way to write your problem in terms of smaller problems
- Store the sub-problem results, to avoid calculating them over and over
- Indentify the base cases

If the previous artifact is `prev` and the current one is `curr`, we have that `count(prev, curr) = count(prev, curr + 1) + count(curr, curr + 1)` (this means that either we skip `curr` or we include it, in which case it becomes the new `prev`).

The base cases are easy: you cannot go outside the artifact list or have a difference bigger than 3 at any given point, and you have a success if you reach the last artifact of the list.

As for the storage, we only have two variables, `prev` and `curr`, with `0 <= prev < curr < n`. Hence, with an `n x n` matrix have enough space to store all results.

```js
/*
Complexity:
- Time: O(n^2)
- Memory: O(n^2)
*/

const artifacts = require("./input");

artifacts.sort((a, b) => a - b);

artifacts.unshift(0);
artifacts.push(artifacts[artifacts.length - 1] + 3);

const n = artifacts.length;

const dp = Array.from(Array(n), () => new Array(n));

const count = (prev, curr, n, artifacts, dp) => {
	if (curr >= n) return 0;

	const diff = artifacts[curr] - artifacts[prev];

	if (diff > 3) return 0;
	if (curr == n - 1) return 1;

	if (dp[prev][curr] === undefined) {
		dp[prev][curr] =
			count(prev, curr + 1, n, artifacts, dp) +
			count(curr, curr + 1, n, artifacts, dp);
	}

	return dp[prev][curr];
};

const output = count(0, 1, n, artifacts, dp);

console.log(output);
```