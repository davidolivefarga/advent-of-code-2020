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
