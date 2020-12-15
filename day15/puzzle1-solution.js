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
