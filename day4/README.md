# Day 4 - Passport Processing

You can find the puzzles [here](https://adventofcode.com/2020/day/4).

## Input

We're given a list of `n` passports that contain information of 8 fields:

- `byr`: (Birth Year)
- `iyr`: (Issue Year)
- `eyr`: (Expiration Year)
- `hgt`: (Height)
- `hcl`: (Hair Color)
- `ecl`: (Eye Color)
- `pid`: (Passport ID)
- `cid`: (Country ID)

Some of these fields might be missing.

The input can be formatted as an array of objects, where all fields are strings:

```js
[
    {
        byr: '1937',
        pid: '860033327'

    },
    {
        byr: '1929',
        eyr: '2023',
        hcl: '#cfa07d'
    }
]
```

## First puzzle

The objective is to count all valid passwords, considering that a password is valid if all mandatory fields (`byr`, `iyr`, `eyr`, `hgt`, `hcl`, `ecl`, `pid`) are informed.

The idea is quite straightforward, nothing interesting to add.

**Complexity:**

- Time: `O(n)`
- Memory: `O(1)`

## Second puzzle

The objective is to count all valid passwords, considering that a password is valid if all mandatory fields (`byr`, `iyr`, `eyr`, `hgt`, `hcl`, `ecl`, `pid`) are informed and have the proper format:

- `byr`: (Birth Year) - four digits, at least 1920 and at most 2002
- `iyr`: (Issue Year) - four digits, at least 2010 and at most 2020
- `eyr`: (Expiration Year) - four digits, at least 2020 and at most 2030
- `hgt`: (Height) - a number followed by either cm or in
  - If cm, the number must be at least 150 and at most 193
  - If in, the number must be at least 59 and at most 76
- `hcl`: (Hair Color) - a # followed by exactly six characters 0-9 or a-f
- `ecl`: (Eye Color) - exactly one of: amb blu brn gry grn hzl oth
- `pid`: (Passport ID) - a nine-digit number, including leading zeroes

The idea is quite straightforward, we can use [regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) to help us validate those formats.

**Complexity:**

- Time: `O(n)`
- Memory: `O(1)`