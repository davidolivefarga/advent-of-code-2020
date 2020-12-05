# Day 1 - Report Repair

You can find the puzzles [here](https://adventofcode.com/2020/day/1).

## Input

We're given a list of `n` positive integers, which we can format as an array:

```js
[1721, 266, 299, 33]
```

## First puzzle

The objective is to find two numbers `a` and `b` such that `a + b = 2020`, and then compute `ab`.

The idea is to go through the array keep track of all the visited numbers. If for some number `num` we already visited `2020 - num` we're finished, since we found two numbers `a = num` and `b = 2020 - num` that sum 2020.

**Complexity:**

- Time: `O(n)`
- Memory: `O(n)`

## Second puzzle

The objective is to find two numbers `a`, `b` and `c` such that `a + b + c = 2020`, and then compute `abc`.

The idea is to go through the array, and for each number `num` we can create a sub-problem of finding two other numbers that sum `2020 - num`. This sub-problem can be solved using the strategy of the first puzzle.

In order to avoid repeating combinations, if `a` is on index `i`, we'll only look for `b` and `c` candidates on indices `j` such that `j > i`.

**Complexity:**

- Time: `O(n^2)`
- Memory: `O(n^2)`