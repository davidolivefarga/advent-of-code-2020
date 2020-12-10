const artifacts = require("./input");

artifacts.sort((a, b) => a - b);

artifacts.unshift(0);
artifacts.push(artifacts[artifacts.length - 1] + 3);

const n = artifacts.length;

const dp = Array.from(Array(n), () => new Array(n));

const count = (prev, curr, n, artifacts, dp) => {
	if (curr >= n) return 0;

	const diff = artifacts[curr] - artifacts[prev];

	if (diff > 3) return 0;
	if (curr == n - 1) return 1;

	if (dp[prev][curr] === undefined) {
		dp[prev][curr] =
			count(prev, curr + 1, n, artifacts, dp) +
			count(curr, curr + 1, n, artifacts, dp);
	}

	return dp[prev][curr];
};

const output = count(0, 1, n, artifacts, dp);

console.log(output);
