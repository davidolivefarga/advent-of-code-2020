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
