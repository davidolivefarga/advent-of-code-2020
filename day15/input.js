const input = `
16,12,1,0,15,7,11
`
	.trim()
	.split(",")
	.map((n) => parseInt(n, 10));

module.exports = input;
