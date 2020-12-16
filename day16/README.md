# Day 16: Ticket Translation

You can find the puzzles [here](https://adventofcode.com/2020/day/16).

## ✍🏼 Input

There are three inputs:

- `k` field rules
- A ticket (our ticket) with a value for each field
- `n` tickets (from other passengers) with a value for each field

### Raw input

```
class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
```

### Formatted input

```js
[
	[
		['class', [1, 3], [5, 7]],
		['row', [6, 11], [33, 44]],
		['seat', [13, 40], [45, 50]]
	],
	[7, 1, 4],
	[
		[7, 3, 7],
		[40, 4, 50],
		[55, 2, 20]
	]
]
```

## 🧩 First puzzle

### Objective

Find of all the values in the list of other tickets that are invalid (that is, they don't satisfy any field rule) and calculate their sum.

### Solution

Once you have the input nicely formatted, the solution is quite straightforward.

```js
/*
Complexity:
- Time: O(n * k^2)
- Memory: O(k)
*/

const [rules, myTicket, otherTickets] = require("./input");

const isValueInRange = (value, min, max) => value >= min && value <= max;

const isValueValidForRule = (value, rule) => {
	const [_, [min1, max1], [min2, max2]] = rule;

	return isValueInRange(value, min1, max1) || isValueInRange(value, min2, max2);
};

const getTicketInvalidValues = (ticket) =>
	ticket.filter((value) =>
		rules.every((rule) => !isValueValidForRule(value, rule))
	);

let output = 0;

for (let ticket of otherTickets) {
	const invalidFields = getTicketInvalidValues(ticket);

	for (let field of invalidFields) {
		output += field;
	}
}

console.log(output);
```

## 🧩 Second puzzle

### Objective

Use the valid tickets from other passengers to determine which is the position of each field in a ticket. Then, get the value of the fields that start with `departure` in our ticket and multiply them.

### Solution

This puzzle is more interesting, the main problem is to determine which is the position of each field in a ticket.

The first thing to do is to get the list of possible field candidates for each position. This can be done by checking if a field rule is satisifed when we apply it to that possition for all valid tickets. The next step is to sort the position by number of candidates. The input for this problem is conveniently prepared so that we will obtain something like:

```
field candidates for the 1st position in the sorted list: [a]
field candidates for the 2nd position in the sorted list: [a, b]
field candidates for the 3rd position in the sorted list: [a, b, c]
```

This makes it easy to find the field for each position. For the first position in the sorted list, it can only be `a`, so we're good. Then, since `a` is already used, for the next position the field is also uniquely determined, in this case is `b`. This process can be repeated until we have uniquely matched all positions with their corresponding fields.

Notice that they could have made the situation harder by having something like:

```
field candidates for the 1st position in the sorted list: [a]
field candidates for the 2nd position in the sorted list: [b, c]
field candidates for the 3rd position in the sorted list: [a, b]
```

For such scenarios, we would need to be more careful and do _another sorting_ (not really another sorting, but you get the idea) every time we find a match, so that we do the matchings correctly. I was too lazy to implement that generic solution, but I leave it as an exercise to the reader 😁

```js
/*
Complexity:
- Time: O(n * k^2)
- Memory: O(k)
*/

const [rules, myTicket, otherTickets] = require("./input");

const isValueInRange = (value, min, max) => value >= min && value <= max;

const isValueValidForRule = (value, rule) => {
	const [_, [min1, max1], [min2, max2]] = rule;

	return isValueInRange(value, min1, max1) || isValueInRange(value, min2, max2);
};

const getTicketInvalidValues = (ticket) =>
	ticket.filter((value) =>
		rules.every((rule) => !isValueValidForRule(value, rule))
	);

const validTickets = otherTickets.filter(
	(ticket) => getTicketInvalidValues(ticket).length == 0
);

const numberOfFields = rules.length;
const candidatesData = [];

for (let fieldPos = 0; fieldPos < numberOfFields; fieldPos++) {
	const fieldCandidates = rules
		.filter((rule) =>
			validTickets.every((ticket) =>
				isValueValidForRule(ticket[fieldPos], rule)
			)
		)
		.map(([name]) => name);

	candidatesData.push([fieldPos, fieldCandidates]);
}

candidatesData.sort(([_p1, c1], [_p2, c2]) => c1.length - c2.length);

const fieldNames = [];
const usedFields = new Set();

for (let [fieldPos, candidates] of candidatesData) {
	for (let candidate of candidates) {
		if (!usedFields.has(candidate)) {
			usedFields.add(candidate);
			fieldNames[fieldPos] = candidate;
			break;
		}
	}
}

let output = 1;

fieldNames.forEach((fieldName, fieldPos) => {
	if (fieldName.startsWith("departure")) {
		output *= myTicket[fieldPos];
	}
});

console.log(output);
```