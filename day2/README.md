# Day 2 - Password Philosophy

You can find the puzzles [here](https://adventofcode.com/2020/day/2).

## Input

A list of `n` passports of length `m`, along with their policies. 

Every line has the format `'n1-n2 c: p'`, where:

- `n1` and `n2` are positive integers
- `c` is a character
- `p` is a string representing the password

### Raw input

```
1-3 a: abcde
1-3 b: cdefg
```

### Formatted input

```js
[
    [1, 3, 'a', 'abcde'],
    [1, 3, 'b', 'cdefg']
]
```

## First puzzle

### Objective

Find the amount of valid passwords. A password is valid if it contains the character `c` at least `n1` times and at most `n2` times.

### Solution

Go through the password characters and count the amount of times the character `c` appears. To speed up the calculations, discard those passwords whose length is less than `n1` and stop counting the moment this amount is greater than `n2`.

```js
/*
Complexity:
- Time: O(n * m)
- Memory: O(1)
*/

const data = require("./input");

let output = 0;

const isPasswordValid = (min, max, char, password) => {
	if (password.length < min) {
		return false;
	}

	let count = 0;

	for (let c of password) {
		if (c == char) {
			count++;

			if (count > max) {
				break;
			}
		}
	}

	return count >= min && count <= max;
};

for (let [min, max, char, password] of data) {
	if (isPasswordValid(min, max, char, password)) {
		output++;
	}
}

console.log(output);
```

## Second puzzle

### Objective

Find the amount of valid passwords. A password is valid if the character `c` appears exactly once at positions `n1` and `n2`.

### Solution

This is quite straightforward, the only interesting thing is the use of the [XOR operator ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_XOR) to check the validity condition. Also, notice that positions `n1` and `n2` are 1-indexed, so we need to subtract 1 when accessing the array.

```js
/*
Complexity:
- Time: O(n)
- Memory: O(1)
*/

const data = require("./input");

let output = 0;

const isPasswordValid = (pos1, pos2, char, password) => {
	return (password[pos1 - 1] == char) ^ (password[pos2 - 1] == char);
};

for (let [pos1, pos2, char, password] of data) {
	if (isPasswordValid(pos1, pos2, char, password)) {
		output++;
	}
}

console.log(output);
```