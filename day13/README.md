# Day 13 - Shuttle Search

You can find the puzzles [here](https://adventofcode.com/2020/day/13).

## ✍🏼 Input

A timestamp `t` represented by a positive integer and a list of `n` bus IDs.

### Raw input

```
939
7,13,x,x,59,x,31,19
```

### Formatted input

```js
[
	939,
	[7, 13, 'x', 'x', 59, 'x', 31, 19]
]
```

## 🧩 First puzzle

### Objective

Ignoring the bus IDs marked as `x`, the frequency of each bus is determined by its ID. For example, bus 7 can be taken at times 0, 7, 14, etc.

Find the first bus that can be taken starting at timestamp `t`. Then, compute the product of the bus ID and the time it takes to take it.

### Solution

First, we need to calculate how much should we wait for each bus, and then choose the one that has a minimum waiting time.

To calculate the waiting time, let's start by calculating when was the last time the bus was available. Imagine `t` is 27 and the bus ID is 5; the last time the bus was available was at `t` = 25, that is, 2 minutes ago. This can be generalised to `t % bus_id`. Then, the next bus will come at `bus_id - t % bus_id`, since this is the missing time for the bus to complete a cycle and be available again.

```js
/*
Complexity:
- Time: O(n)
- Memory: O(n)
*/

let [initialTime, busIds] = require("./input");

busIds = busIds.filter((e) => e != "x");

let selectedBusId;
let smallestWaitTime = Number.MAX_SAFE_INTEGER;

for (let busId of busIds) {
	const waitTime = busId - (initialTime % busId);

	if (waitTime < smallestWaitTime) {
		selectedBusId = busId;
		smallestWaitTime = waitTime;
	}
}

const output = selectedBusId * smallestWaitTime;

console.log(output);
```

## 🧩 Second puzzle

### Objective

To understand the objective, is easier to describe it with an example. Consider the list `[7, 13, 'x', 'x', 59, 'x', 31, 19]`. If we map the valid bus IDs to their index in the array, we have:

```js
[
	[7, 0],
	[13, 1],
	[59, 4],
	[31, 6],
	[19, 7],
]
```

We want to find the minimum `t` such that bus 7 is available at time `t`, bus 13 is available at time `t + 1`, bus 59 is available al time `t + 4` and so on.

Find the solution for any given input.

### Solution

This problem consists on finding the smallest solution of a given modular equation system, and this can be done using the [Chinese Reminder Theorem](https://en.wikipedia.org/wiki/Chinese_remainder_theorem). Notice that this is possible because the bus IDs are all prime numbers, so we're under valid conditions to apply the theorem. Let's see how this is done:

1. First, we need to create our system of equations. Using the example from before:
   
   ```
   Bus 7 is available at t -> t % 7 = 0 -> t = 0 (mod 7)
   Bus 13 is available at t + 1 -> (t + 1) % 13 = 0 -> t = -1 (mod 13) -> t = 12 (mod 13)
   Bus 59 is available at t + 4 -> (t + 4) % 59 = 0 -> t = -4 (mod 59) -> t = 55 (mod 59)
   ...
   ```

   This gives us a modular equation system:

   ```
   t = 0 (mod 7)
   t = 12 (mod 13)
   t = 55 (mod 59)
   ...
   ```

2. Then, we need to solve that system. The best way to do this is by finding the solution to the first two equations, then using that solution to find the solution to the first three equations, and so on. Let's us the example to get the idea. Solving the two equations is easy: we know `t` must be a multiple of 7, so we can check all multiples of 7 until we find one that also satisfies the second equation. In our case:
   
   ```
   7, 14, 21, ..., 77
   ```

   77 is the first multiple of 7 that satisfies the second equation, as 77 % 13 = 12. Are there other solutions? Yes, there are infinite many more! Consider any number of the form 77 + 7 * 13 * k. Since 7 * 13 * k is a multiple of 7 and 13, it won't change anything when we plug it in our modular equations.

   Now, amongst all of these solutions, we need to find the one that also satisfies the third equation.

   ```
   77, 77 + 7 * 13, 77 + 7 * 13 * 2, ..., 77 + 7 * 13 * 27
   ```

   Which in our case, is 77 + 7 * 13 * 27. Again, this is the smallest solution amongst infinite ones. From these, we'll need to select the one also satisfying the fourth equation, and so on.

```js
/*
Complexity:
- Time: O(n^2)
- Memory: O(n)
*/

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
```