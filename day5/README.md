# Day 5 - Binary Boarding

You can find the puzzles [here](https://adventofcode.com/2020/day/5).

## Input

We're given a list of `n` plane seats, which are represented as a string of 10 characters.

The first 7 characters are either an `F` or a `B`, and they are used to encode the seat row, which is a number from 0 to 127. The characters encode this number using binary search. `F` means taking the lower half and `B` means taking the upper half. For example, with `FBFBBFFRLR` we have:

```
[0, 127] -> [0, 63] -> [32, 63] -> [32, 47] -> [40, 47] -> [44, 47] -> [44, 45] -> [45, 45]
```

The last 3 characters are either an `L` or an `R`, and they are used to encode the seat row, which is a number from 0 to 7. The characters encode this number using binary search. `L` means taking the lower half and `R` means taking the upper half. For example, with `RLR` we have:

```
[0, 7] -> [4, 7] -> [4, 5] -> [5, 5]
```

Given a seat with row `r` and column `c`, we can calculate its ID with the formula `8r + c`.

The input can be formatted as an array of strings:

```js
[
    `BFFFBBFRRR`,
    `FFFBBBFRRR`
]
```

## First puzzle

The objective is to find the plane seat from the list with the highest ID.

The idea is quite straightforward, we only need to code a binary search algorithm following the instructions from the problem statement.

**Complexity:**

- Time: `O(n)`
- Memory: `O(1)`

## Second puzzle

The objective is to find the missing plane seat, knowing that some of the seats in the front and some of the seats in the back don't exist. We are also guaranteed that the IDs to the left and to the right of our ID exist.

The naive way to do solve this puzzle is by storing all IDs, sort them and iterate through them to find the missing one. This has time cost `O(nlogn)` and memory cost `O(n)`.

We can do better than that by using some maths. First, notice that we have a sequence of numbers `[m, m + 1, ... , n - 1, n` that is missing a number.

Consider the following quantities:

- `k`: the sum of all numbers of our sequence
- `S`: the sum of all positive integers from 1 to `n`
- `s`: the sum of all positive integers from 1 to `m - 1`

We know that `S - s` is the sum of all positive numbers from `m` to `n`. Hence, if we subtract from it all the numbers from our original sequence, we will be left out with the missing one. That is, our missing ID is `S - s - k`.

Luckily for us, there is a formula for those quantities, since the sum of the first `x` numbers is `x(x + 1) / 2`. Also, we know that `m` and `n` are the smallest and the biggest IDs of our sequence, respectively. In summary, we can find `m`, `n` and `k` with time cost `O(n)` and memory cost `O(1)`.

**Complexity:**

- Time: `O(n)`
- Memory: `O(1)`