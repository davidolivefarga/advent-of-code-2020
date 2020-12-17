const input = `
#...#...
#..#...#
..###..#
.#..##..
####...#
######..
...#..#.
##.#.#.#
`
	.trim()
	.split(/\n/)
	.map((l) => l.split(""));

module.exports = input;
