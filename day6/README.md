# Day 6 - Custom Customs

You can find the puzzles [here](https://adventofcode.com/2020/day/6).

## 📄 Input

A list of `n` groups of forms, where each group contains `m` forms.

A form is a string of length `k`, made of lowercase letters. Each letter represents a question.

### Raw input

```
abc

a
b
c
```

### Formatted input

```js
[
    ['abc'],
    ['a', 'b', 'c']
]
```

## 1️⃣ First puzzle

### Objective

Count the amount of unique questions that appear in a group. Then, calculate the sum for all groups.

### Solution

Quite straightforward, nothing to add. Since the amount of unique questions is small (there are only 26 letters), we can check if we alread have all of them after parsing each form, to avoid unnecessary calculations.

```js
/*
Complexity:
- Time: O(n * m * k)
- Memory: O(n)
*/

const formGroups = require("./input");

let output = 0;

for (let formGroup of formGroups) {
	const questions = new Set();

	for (let form of formGroup) {
		for (let question of form) {
			questions.add(question);
		}

		if (questions.length == 26) {
			break;
		}
	}

	output += questions.size;
}

console.log(output);
```

## 2️⃣ Second puzzle

### Objective

Count the amount of questions that appear in all the forms of a group. Then, calculate the sum for all groups.

### Solution

Again, this is quite straightforward, nothing to add. This time we use a map/object instead of a set, but that's it.

```js
/*
Complexity:
- Time: O(n * m * k)
- Memory: O(n)
*/

const formGroups = require("./input");

let output = 0;

const availableQuestions = "abcdefghijklmnopqrstuvwxyz".split("");

for (let formGroup of formGroups) {
	const formCount = formGroup.length;
	const questionCount = {};

	for (let form of formGroup) {
		for (let question of form) {
			questionCount[question] = (questionCount[question] || 0) + 1;
		}
	}

	availableQuestions.forEach((question) => {
		if (questionCount[question] == formCount) {
			output++;
		}
	});
}

console.log(output);
```