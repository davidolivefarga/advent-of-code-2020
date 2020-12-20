const tiles = require("./input");

const edgeFrequency = new Map();

const encode = (edge) => edge.join(",");

for (let [tileNum, tileData] of Object.entries(tiles)) {
	const n = tileData.length;

	const topEdge = [];
	const bottomEdge = [];
	const leftEdge = [];
	const rightEdge = [];

	for (let i = 0; i < n; i++) {
		topEdge[i] = tileData[0][i];
		bottomEdge[i] = tileData[n - 1][i];
		leftEdge[i] = tileData[i][0];
		rightEdge[i] = tileData[i][n - 1];
	}

	const uniqueEncodedEdges = new Set();

	uniqueEncodedEdges.add(encode(topEdge));
	uniqueEncodedEdges.add(encode(topEdge.reverse()));
	uniqueEncodedEdges.add(encode(bottomEdge));
	uniqueEncodedEdges.add(encode(bottomEdge.reverse()));
	uniqueEncodedEdges.add(encode(leftEdge));
	uniqueEncodedEdges.add(encode(leftEdge.reverse()));
	uniqueEncodedEdges.add(encode(rightEdge));
	uniqueEncodedEdges.add(encode(rightEdge.reverse()));

	uniqueEncodedEdges.forEach((encodedEdge) => {
		if (!edgeFrequency.has(encodedEdge)) {
			edgeFrequency.set(encodedEdge, [tileNum]);
		} else {
			edgeFrequency.get(encodedEdge).push(tileNum);
		}
	});
}

const unmatchedEdgesByTile = new Map();
const corners = [];

for (let matchingTiles of edgeFrequency.values()) {
	if (matchingTiles.length == 1) {
		const tile = matchingTiles[0];

		if (!unmatchedEdgesByTile.has(tile)) {
			unmatchedEdgesByTile.set(tile, 1);
		} else {
			unmatchedEdgesByTile.set(tile, unmatchedEdgesByTile.get(tile) + 1);
		}

		if (unmatchedEdgesByTile.get(tile) == 4) {
			corners.push(tile);
		}
	}
}

const output = corners.reduce((acc, curr) => acc * curr, 1);

console.log(output);

// Wild guess: get all edge that have a unique number
// If the number appears 4 times, it is a corner

// This is because if we assume the corner edges can
// never match, they will be in the count only once,
// and so will their reverses.

// 2 edges x 2 arrangements = 4
