let [initialTime, busIds] = require("./input");

busIds = busIds.filter((e) => e != "x");

let selectedBusId;
let smallestWaitTime = Number.MAX_SAFE_INTEGER;

for (let busId of busIds) {
	const waitTime = busId - (initialTime % busId);

	if (waitTime < smallestWaitTime) {
		selectedBusId = busId;
		smallestWaitTime = waitTime;
	}
}

const output = selectedBusId * smallestWaitTime;

console.log(output);
