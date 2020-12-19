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
