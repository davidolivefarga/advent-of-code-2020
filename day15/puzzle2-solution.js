const nums = require("./input");

const lastTurnUsed = new Map();

let turn = 1;
let lastSpokenNum = nums[0];

while (turn < nums.length) {
	lastTurnUsed.set(lastSpokenNum, turn);
	lastSpokenNum = nums[turn];

	turn++;
}

while (turn < 30000000) {
	const lastTurnUsedLastNum = lastTurnUsed.get(lastSpokenNum) || turn;

	lastTurnUsed.set(lastSpokenNum, turn);

	lastSpokenNum = turn - lastTurnUsedLastNum;

	turn++;
}

console.log(lastSpokenNum);
