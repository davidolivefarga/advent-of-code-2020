# Day 4 - Passport Processing

You can find the puzzles [here](https://adventofcode.com/2020/day/4).

## 📄 Input

A list of `n` passports that contain information of 8 fields (some might be missing):

- `byr`: (Birth Year)
- `iyr`: (Issue Year)
- `eyr`: (Expiration Year)
- `hgt`: (Height)
- `hcl`: (Hair Color)
- `ecl`: (Eye Color)
- `pid`: (Passport ID)
- `cid`: (Country ID)

### Raw input

```
ecl:gry pid:860033327 eyr:2020

iyr:2013
hcl:#fffffd cid:350
```

### Formatted input

```js
[
    {
        ecl: 'gry',
        pid: '860033327',
        eyr: '2020'

    },
    {
        iyr: '2013',
        hcl: '#fffffd',
        cid: '350'
    }
]
```

## 1️⃣ First puzzle

### Objective

Count all valid passwords. A password is valid if all mandatory fields (`byr`, `iyr`, `eyr`, `hgt`, `hcl`, `ecl`, `pid`) are informed.

### Solution

This is quite straightforward, nothing interesting to add.

```js
/*
Complexity:
- Time: O(n)
- Memory: O(1)
*/

const passports = require("./input");

let output = 0;

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

for (let passport of passports) {
	if (requiredFields.every((field) => !!passport[field])) {
		output++;
	}
}

console.log(output);
```

## 2️⃣ Second puzzle

### Objective

Count all valid passwords. A password is valid if all mandatory fields (`byr`, `iyr`, `eyr`, `hgt`, `hcl`, `ecl`, `pid`) are informed and have the proper format:

- `byr`: (Birth Year) - four digits, at least 1920 and at most 2002
- `iyr`: (Issue Year) - four digits, at least 2010 and at most 2020
- `eyr`: (Expiration Year) - four digits, at least 2020 and at most 2030
- `hgt`: (Height) - a number followed by either cm or in
  - If cm, the number must be at least 150 and at most 193
  - If in, the number must be at least 59 and at most 76
- `hcl`: (Hair Color) - a # followed by exactly six characters 0-9 or a-f
- `ecl`: (Eye Color) - exactly one of: amb blu brn gry grn hzl oth
- `pid`: (Passport ID) - a nine-digit number, including leading zeroes

### Solution

This is quite straightforward, we can use [regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) to help us validate those formats.

```js
/*
Complexity:
- Time: O(n)
- Memory: O(1)
*/

const passports = require("./input");

let output = 0;

const HCL_REGEX = /^#[a-f\d]{6}$/;
const ECL_VALUES = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
const PID_REGEX = /^\d{9}$/;

const numberInRange = (n, min, max) =>
	!!(n = parseInt(n, 10)) && n >= min && n <= max;

const fieldValidations = {
	byr: (v) => v.length == 4 && numberInRange(v, 1920, 2002),
	iyr: (v) => v.length == 4 && numberInRange(v, 2010, 2020),
	eyr: (v) => v.length == 4 && numberInRange(v, 2020, 2030),
	hgt: (v) =>
		(v.endsWith("cm") && numberInRange(v.slice(0, -2), 150, 193)) ||
		(v.endsWith("in") && numberInRange(v.slice(0, -2), 59, 76)),
	hcl: (v) => HCL_REGEX.test(v),
	ecl: (v) => ECL_VALUES.includes(v),
	pid: (v) => PID_REGEX.test(v),
};

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

for (let passport of passports) {
	if (
		requiredFields.every(
			(field) => passport[field] && fieldValidations[field](passport[field])
		)
	) {
		output++;
	}
}

console.log(output);
```