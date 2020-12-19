# Day 19: Monster Messages

You can find the puzzles [here](https://adventofcode.com/2020/day/19).

## ✍🏼 Input

The input consist on two parts: a list of `n` rules and a list of `m` messages.

There are three type of rules:

- Rule of the form `c`: it means it has to match the character `c`.
- Rule of the form `1 2 3`: it means it has to match rules `1`, `2` and `3` in that order.
- Rule of the form `1 2 | 3 4`: it means it has to match either `1 2` or `3 4`.

### Raw input

```
0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: "a"
5: "b"

ababbb
bababa
abbbab
```

### Formatted input

```js
[
	{
		'0': ['4', '1', '5'],
		'1': [['2', '3'], ['3', '2']],
		'2': [['4', '4'], ['5', '5']],
		'3': [['4', '5'], ['5', '4']],
		'4': 'a',
		'5': 'b'
	},
	[
		'ababbb',
		'bababa',
		'abbbab'
	]
]
```

## 🧩 First puzzle

### Objective

Count the number of messages that match rule `0`.

### Solution

Initally, you might think to calculate all the possible strings that can match a specific rule, but this is not good. Because of the `|`, the number of possibilities is exponential, so for a large number of rules the program will take _a lot_ of time to execute.

The next think I tried was to see if each rule corresponded to a string of fixed length, as this would help simplify the problem. For example, in the example input we have 8 possibilities for rule `1`: `aaab`, `aaba`, `bbab`, `bbba`, `abaa`, `abbb`, `baaa`, or `babb`. However, they all have in common that have length 4, so we know that in order to have a match for tule `1`, we require a string of length 4.

After some experimenting, I found out that this is true for our real input (you might get a hint if you see the lengths of messages). Calculating the length of the different rules can be done quickly using dynamic programming (recursion combined with storing partial results), with only `O(n)` cost.

Now that we know each rule length, we can process our messages recursively by splitting our message into different parts.

- If the rule is of the type `c`, then the message is valid if and only if the whole message is equal to `c`.
- If the rule is of the type `1 2 3`, then we need to split the message in 3 parts, according to the lengths of rules `1`, `2` and `3`. Then, the message is valid if the first part matches rule `1`, the second part matches rule `2` and the third part matches rule `3`.
- If the rule is of the type `1 2 | 3 4`, then the message is valid if it matches `1 2` or `3 4`, and these cases fall in the previous scenario.

Since we know the rules length, we can already discard those messages that have different length than that of rule `0`.

My code isn't the best (for example it can be optimized by reducing the amount of strings created with `slice`) but I was too lazy to improve it.

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
	if (message.length == rulesLength[0] && isValidMessage(message, 0)) {
		validMessages++;
	}
}

console.log(validMessages);
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