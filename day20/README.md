# Day 20: Jurassic Jigsaw

You can find the puzzles [here](https://adventofcode.com/2020/day/20).

## ✍🏼 Input

A list of `n` tiles.

A tile consist of a `k x k` map which can have two values: `#` and `.`.

### Raw input

```
Tile 2311:
..#
##.
..#

Tile 1951:
#.#
#.#
...
```

### Formatted input

```js
{
    '2311': [
        ['.', '#', '.'],
        ['#', '#', '.'],
        ['.', '.', '#']
    ],
    '1951': [
        ['#', '.', '#'],
        ['#', '.', '#'],
        ['.', '.', '.']
    ]
}
```

## 🧩 First puzzle

### Objective

The tiles can be connected to form a single image. Two tiles can be connected if two of their edges are the equal.

However, there's a catch: tiles have been rotated and flipped to a random orientation.

We also know that the outer edges of a tile don't match with any other line.

Find the tile IDs corresponding to the image corners and calculate their product.

### Solution

Since we're told that the outer edges of a tile don't match with any line, a corner will have two edges that can't connect with anyone else. However, since image can be flipped and rotated, for every tile we actually have to consider 8 edges: the 4 original ones and the 4 obtained after flipping those. Hence, a corner will have a total four ummatched edges.

The strategy consists on counting all tiles that connect for a given edge (which we encode so that we can easily store it in a map). Then, we get the tiles that have four edges with a single matching.

My code would be in trouble if the corner edges happen to be palindromes, but this is not the case for our given input, so nothing to worry about.

```js
/*
Complexity:
- Time: O(n * k)
- Memory: O(n)
*/

const tiles = require("./input");

const edgeFrequency = new Map();

const encode = (edge) => edge.join(",");

for (let [tileNum, tileData] of Object.entries(tiles)) {
	const n = tileData.length;

	const topEdge = [];
	const bottomEdge = [];
	const leftEdge = [];
	const rightEdge = [];

	for (let i = 0; i < n; i++) {
		topEdge[i] = tileData[0][i];
		bottomEdge[i] = tileData[n - 1][i];
		leftEdge[i] = tileData[i][0];
		rightEdge[i] = tileData[i][n - 1];
	}

	const uniqueEncodedEdges = new Set();

	uniqueEncodedEdges.add(encode(topEdge));
	uniqueEncodedEdges.add(encode(topEdge.reverse()));
	uniqueEncodedEdges.add(encode(bottomEdge));
	uniqueEncodedEdges.add(encode(bottomEdge.reverse()));
	uniqueEncodedEdges.add(encode(leftEdge));
	uniqueEncodedEdges.add(encode(leftEdge.reverse()));
	uniqueEncodedEdges.add(encode(rightEdge));
	uniqueEncodedEdges.add(encode(rightEdge.reverse()));

	uniqueEncodedEdges.forEach((encodedEdge) => {
		if (!edgeFrequency.has(encodedEdge)) {
			edgeFrequency.set(encodedEdge, [tileNum]);
		} else {
			edgeFrequency.get(encodedEdge).push(tileNum);
		}
	});
}

const unmatchedEdgesByTile = new Map();
const corners = [];

for (let matchingTiles of edgeFrequency.values()) {
	if (matchingTiles.length == 1) {
		const tile = matchingTiles[0];

		if (!unmatchedEdgesByTile.has(tile)) {
			unmatchedEdgesByTile.set(tile, 1);
		} else {
			unmatchedEdgesByTile.set(tile, unmatchedEdgesByTile.get(tile) + 1);
		}

		if (unmatchedEdgesByTile.get(tile) == 4) {
			corners.push(tile);
		}
	}
}

const output = corners.reduce((acc, curr) => acc * curr, 1);

console.log(output);
```

## 🧩 Second puzzle

### Objective

Same as puzzle 1, but with a twist. We're overriding rules `8` and `11`, so that:

```
8: 42 | 42 8
11: 42 31 | 42 11 31
```

Notice that this causes infinite loops, as these two rules contain themselves.

### Solution

As the puzzle suggests, creating a generic solution would be very hard. Hence, we need to leverage the conditions of our particular input.

We have:

```
0: 8 11
8: 42 | 42 8
11: 42 31 | 42 11 31
```

What this means is that our message has a match a rule of the form:

```
42 ...(num8 times)... 42 42 ...(num11 times)... 42 31 ...(num11 times)... 31
```

Since we have calculated the rules length, we know the length of rules `42` and `31`. Hence, we need to find all possible values of `num8` and `num11` such that:

```
length(message) = num8 * length(42) + num11 * (length(42) + length(31))
```

with `num8 > 0` and `num11 > 0`, as there must be at least one occurence of `8` and `11` rules.

Then, we only need to test all the possible rules generated this way using the algorithms from puzzle 1; if at some point there's a match, we're done. 

My code to generate all possibilities could probably be improved, but again, I was too lazy to care about performance.

```js
/*
Complexity:
- Time: O(n + m)
- Memory: O(n)
*/

const [rules, messages] = require("./input");

// Calculate the required string length for each rule using DP

const n = Object.keys(rules).length;
const rulesLength = new Array(n).fill();

const calculateRuleLength = (i, rules, rulesLength) => {
	if (!rulesLength[i]) {
		const rule = rules[i];

		if (typeof rule == "string") {
			rulesLength[i] = 1;
		} else if (typeof rule[0] == "string") {
			rulesLength[i] = rule.reduce(
				(acc, curr) => acc + calculateRuleLength(curr, rules, rulesLength),
				0
			);
		} else {
			rulesLength[i] = rule[0].reduce(
				(acc, curr) => acc + calculateRuleLength(curr, rules, rulesLength),
				0
			);
		}
	}

	return rulesLength[i];
};

for (let ruleNum of Object.keys(rules)) {
	rulesLength[ruleNum] = calculateRuleLength(ruleNum, rules, rulesLength);
}

// Process the messages

const isValidMessageRuleArray = (message, ruleArray) => {
	let left = 0;

	for (let i = 0; i < ruleArray.length; i++) {
		const ruleNum = ruleArray[i];
		const ruleLength = rulesLength[ruleNum];

		if (!isValidMessage(message.slice(left, left + ruleLength), ruleNum)) {
			return false;
		}

		left = left + ruleLength;
	}

	return true;
};

const isValidMessage = (message, ruleNum) => {
	const rule = rules[ruleNum];

	if (typeof rule == "string") {
		return message == rule;
	} else if (typeof rule[0] == "string") {
		return isValidMessageRuleArray(message, rule);
	} else {
		return (
			isValidMessageRuleArray(message, rule[0]) ||
			isValidMessageRuleArray(message, rule[1])
		);
	}
};

let validMessages = 0;

for (let message of messages) {
	const lengthMessage = message.length;
	const length8 = rulesLength[42];
	const length11 = rulesLength[42] + rulesLength[31];

	let num11 = 1;

	while (num11 * length11 + length8 <= lengthMessage) {
		const lengthToBeFilledWith8s = lengthMessage - num11 * length11;

		if (lengthToBeFilledWith8s % length8 == 0) {
			const num8 = lengthToBeFilledWith8s / length8;
			const rule = [];

			for (let i = 0; i < num11; i++) {
				rule.unshift(42);
				rule.push(31);
			}

			for (let i = 0; i < num8; i++) {
				rule.unshift(42);
			}

			if (isValidMessageRuleArray(message, rule)) {
				validMessages++;
				break;
			}
		}

		num11++;
	}
}

console.log(validMessages);
```