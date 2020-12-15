# Day 15: Rambunctious Recitation

You can find the puzzles [here](https://adventofcode.com/2020/day/15).

## ✍🏼 Input

A list of 7 numbers.

### Raw input

```
16,12,1,0,15,7,11
```

### Formatted input

```js
[16, 12, 1, 0, 15, 7, 11]
```

## 🧩 First puzzle

### Objective

Play a game by turns using the following rules:

- Start by speaking all the numbers on the initial list
- After that, pick the latest spoken number
  - If has been only spoken once, speak a 0
  - Else, speak the difference between the last two turns it was spoken

Find the spoken number on turn 2020.

### Solution

The logic might be a little confusing, but the idea is simple: use a hash object to keep track of the last turns a number was spoken.

```js
/*
Complexity:
- Time: O(n)
- Memory: O(n)
*/

const nums = require("./input");

const lastTurnUsed = {};

let turn = 1;
let lastSpokenNum = nums[0];

while (turn < nums.length) {
	lastTurnUsed[lastSpokenNum] = turn;
	lastSpokenNum = nums[turn];

	turn++;
}

while (turn < 2020) {
	const lastTurnUsedLastNum = lastTurnUsed[lastSpokenNum];

	lastTurnUsed[lastSpokenNum] = turn;

	if (lastTurnUsedLastNum === undefined) {
		lastSpokenNum = 0;
	} else {
		lastSpokenNum = turn - lastTurnUsedLastNum;
	}

	turn++;
}

console.log(lastSpokenNum);
```

## 🧩 Second puzzle

### Objective

Using the same rules as before, find the spoken number on turn 30000000 (30 million turns!).

### Solution

This is a lot of turns, but I still tried to use the solution from the previous puzzle, adding a `console.log` to track progress:

```js
while (turn < 30000000) {
	if (turn % 300000 === 0) {
		console.log(`Progress ${turn / 300000}/${100}`);
	}

	// Do logic
}
```

It gave the correct result... However, this took almost 7 minutes! 😱

My next approach was to try if there was a pattern in the sequence. I spent some time, but I found nothing. Then I started researching, and I found that this is a known sequence, called [Van Eck's sequence](https://oeis.org/A181391), and it seems that it doesn't have a closed form.

Then I started trying several code improvements, some of them with incredible results.

- Using a `Map` instead of a hash object reduce the time from 7 minutes to 4.3 seconds
- Removing some conditionals and the console.log, reduced that to 3.9 seconds

I feel that is good enough, but I want to remark how impressive it is the difference between the `Map` and the hash object. I suspected that `Map` could be faster, but not at this level. When I have more time, I'll try to investigate the reason why this happens and edit this document.

```js
/*
Complexity:
- Time: O(n)
- Memory: O(n)
*/

const nums = require("./input");

const lastTurnUsed = new Map();

let turn = 1;
let lastSpokenNum = nums[0];

while (turn < nums.length) {
	lastTurnUsed.set(lastSpokenNum, turn);
	lastSpokenNum = nums[turn];

	turn++;
}

while (turn < 30000000) {
	const lastTurnUsedLastNum = lastTurnUsed.get(lastSpokenNum) || turn;

	lastTurnUsed.set(lastSpokenNum, turn);

	lastSpokenNum = turn - lastTurnUsedLastNum;

	turn++;
}

console.log(lastSpokenNum);
```