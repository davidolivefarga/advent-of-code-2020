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
