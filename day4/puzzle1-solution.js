const passports = require("./input");

let output = 0;

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

for (let passport of passports) {
	if (requiredFields.every((field) => !!passport[field])) {
		output++;
	}
}

console.log(output);
