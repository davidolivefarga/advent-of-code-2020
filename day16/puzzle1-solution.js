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
