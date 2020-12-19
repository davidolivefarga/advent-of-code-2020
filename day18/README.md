# Day 18: Operation Order

You can find the puzzles [here](https://adventofcode.com/2020/day/18).

## ✍🏼 Input

A list of `n` arithmetic expressions.

### Raw input

```
2 * 3 + (4 * 5)
5 * 9 * (10 + (8 + 6 * 4))
```

### Formatted input

```js
[
	[2, '*', 3, '+', '(', 4, '*', 5, ')'],
	[5, '*', 9, '*', '(', 10, '+', '(', 8, '+', 6, '*', 4, ')'],
]
```

## 🧩 First puzzle

### Objective

Calculate the result of each arithmetic expression, with the twist that `+` and `*` have the same precedence (i. e., you evaluate from left to right).

Then, calculate the sum of all results.

### Solution

The puzzle difficulty is definitely increasing! If this these were regular expressions, we could simply use Javascript's `eval`, but because of the change in operators precedence we can't (using `eval` would be cheating anyways, so it's fine).

Ok, so let's see how can we tackle this problem. The first thing to notice is that parenthesis are a pain in the ass. If we could get rid of them, then processing the expression would become straightforward. Luckily for us, there's a way to do that. You see, the way we write our arithemtic expression has a name, which is [infix notation](https://en.wikipedia.org/wiki/Infix_notation), and infix notation requires parenthesis. But there are equivalent ways to write an expression, which are the [prefix notation](https://en.wikipedia.org/wiki/Polish_notation) (or Polish notation) and the [postfix notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation) (or reverse Polish notation). Neither of those alternative ways require parenthesis, so we might be interested in them!

In my case, I chose to use postfix notation. Our problem consists now of two steps:

- Convert our infix expression to a postfix expression
- Process the postifx expression

**Infix expression to postfix expression**

You can find the algorithm [here](https://runestone.academy/runestone/books/published/pythonds/BasicDS/InfixPrefixandPostfixExpressions.html). Bascially, you need to follow these steps (which are tweaked to match the puzzle conditions):

- Create two stacks, one to store the postfix expression (`postfixExpression`) and one to temporarily store operators (`operators`).
- Start processing the expression elements (`e`) from left to right:
  - If `e` is a number, push it to `postfixExpression`.
  - If `e` is a `(`, push it to `operators`.
  - If `e` is a `+` or a `*`, push it to `operators`, but first pop all operators that are `+` or `*` and push them to `postfixExpression`.
  - If `e` is a `)`, pop `operators` until you find a `(`. Push all popped operators to `postfixExpression`.

If you follow this process, `2 * 3 + (4 * 5)` becomes `2 3 * 4 5 * +`.

**Process a postfix expression**

Processing a postfix expression is easy, in fact it is easier to process than an infix expression (why aren't we taught this way at school? 🤔).

- Create a stack to keep track of partial results (`results`).
- Start processing the expression elements (`e`) from left to right:
    - If `e` is a number, push it to `results`.
    - If `e` is an operator, pop the last two numbers from `results`, apply the operator and push the result to `results`.

The result of evaluating the expression will be the last remaining number in the `results` stack.

For example, the result of evaluating `2 3 * 4 5 * +` is `26`.

**Solution code**

```js
/*
Complexity:
- Time: O(n)
- Memory: O(n)
*/

const expressions = require("./input");

const toPostifx = (expression) => {
	const postfixExpression = [];
	const operators = [];

	let op;

	for (let e of expression) {
		if (Number.isInteger(e)) {
			postfixExpression.push(e);
		} else if (e == "(") {
			operators.push(e);
		} else if (e == "+" || e == "*") {
			while ((op = operators[operators.length - 1]) == "+" || op == "*") {
				postfixExpression.push(operators.pop());
			}
			operators.push(e);
		} else if (e == ")") {
			while ((op = operators.pop()) !== "(") {
				postfixExpression.push(op);
			}
		}
	}

	while ((op = operators.pop())) {
		postfixExpression.push(op);
	}

	return postfixExpression;
};

const evaluateExpression = (expression) => {
	const postfixExpression = toPostifx(expression);

	const results = [];

	for (let e of postfixExpression) {
		if (Number.isInteger(e)) {
			results.push(e);
		} else {
			const r1 = results.pop();
			const r2 = results.pop();

			if (e == "+") {
				results.push(r1 + r2);
			} else if (e == "*") {
				results.push(r1 * r2);
			}
		}
	}

	return results[0];
};

let output = 0;

for (let expression of expressions) {
	output += evaluateExpression(expression);
}

console.log(output);
```

## 🧩 Second puzzle

### Objective

Same as first puzzle, but the twist now is that `+` has precedence over `*`.

### Solution

Same strategy as before, but tweaking the algorithm to take into account the precedence condition. Now the steps are:

- Create two stacks, one to store the postfix expression (`postfixExpression`) and one to temporarily store operators (`operators`).
- Start processing the expression elements (`e`) from left to right:
  - If `e` is a number, push it to `postfixExpression`.
  - If `e` is a `(`, push it to `operators`.
  - If `e` is a `+`, push it to `operators`, but first pop all operators that are `+` and push them to `postfixExpression`.
  - If `e` is a `*`, push it to `operators`, but first pop all operators that are `*` or `+` and push them to `postfixExpression`.
  - If `e` is a `)`, pop `operators` until you find a `(`. Push all popped operators to `postfixExpression`.

```js
/*
Complexity:
- Time: O(n)
- Memory: O(n)
*/

const expressions = require("./input");

const toPostifx = (expression) => {
	const postfixExpression = [];
	const operators = [];

	let op;

	for (let e of expression) {
		if (Number.isInteger(e)) {
			postfixExpression.push(e);
		} else if (e == "(") {
			operators.push(e);
		} else if (e == "+") {
			while ((op = operators[operators.length - 1]) == "+") {
				postfixExpression.push(operators.pop());
			}
			operators.push(e);
		} else if (e == "*") {
			while ((op = operators[operators.length - 1]) == "*" || op == "+") {
				postfixExpression.push(operators.pop());
			}
			operators.push(e);
		} else if (e == ")") {
			while ((op = operators.pop()) !== "(") {
				postfixExpression.push(op);
			}
		}
	}

	while ((op = operators.pop())) {
		postfixExpression.push(op);
	}

	return postfixExpression;
};

const evaluateExpression = (expression) => {
	const postfixExpression = toPostifx(expression);

	const results = [];

	for (let e of postfixExpression) {
		if (Number.isInteger(e)) {
			results.push(e);
		} else {
			const r1 = results.pop();
			const r2 = results.pop();

			if (e == "+") {
				results.push(r1 + r2);
			} else if (e == "*") {
				results.push(r1 * r2);
			}
		}
	}

	return results[0];
};

let output = 0;

for (let expression of expressions) {
	output += evaluateExpression(expression);
}

console.log(output);
```