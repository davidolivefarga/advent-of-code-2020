# Day 7 - Handy Haversacks

You can find the puzzles [here](https://adventofcode.com/2020/day/7).

## ✍🏼 Input

A list of `n` bags. Each bag can contain some amount of up to `m` other bags.

### Raw input

```
light red bags contain 1 bright white bag, 2 muted yellow bags, 1 shiny gold.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
```

### Formatted input

```js
{
	'light red': {
		'bright white': 1,
		'muted yellow': 2,
		'shiny gold': 1
	},
	'dark orange': {
		'bright white': 3,
		'muted yellow': 4
	}
}
```

## 🧩 First puzzle

### Objective

Count the amount of bags that end up having a `shiny gold` back inside.

### Solution

For each bag, we need to iterate over the bags it contains and keep repeating the process until we find a `shiny gold` bag. However, we need to take into account two things:

- We need to keep track of visited bags to avoid going into infinite loops. For example, it could be that `bag1` contains `bag2` and viceversa. To avoid that, we simply avoid iterating over visited bags. Notice that we first mark a bag as visited, iterate over its content, and then mark it as unvisited. This is to have a clean slate for every bag we check.
- We can cache partial results to avoid repeating unnecessary calculations.

```js
/*
Complexity:
- Time: O(n * m)
- Memory: O(n)
*/

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
```

## 🧩 Second puzzle

### Objective

Count the total amount of bags we have inside a `shiny gold` bag.

### Solution

In this case, we can assume there will be no cycles, otherwise the answer would be infinite. Hence, we only need to iterate over the `shiny gold` bag contents and repeat the process until we reach empty bags. Notice that if at some point we have `k` bags of type `bag1`, we need to count the `k` bags and `k` times the total amount of bags inside a bag of type `bag1`.

```js
/*
Complexity:
- Time: O(n * m)
- Memory: O(1)
*/

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
```