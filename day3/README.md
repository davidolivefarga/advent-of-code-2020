# Day 3 - Tobbogan Trajectory

You can find the puzzles [here](https://adventofcode.com/2020/day/3).

## Input

We're given a matrix of `n` rows and `m` columns representing a map, which can have two values:

- `.`: empty square
- `#`: occupied square

The starting position `(0, 0)` is guaranteed to be an empty square.

The map extends infinitely to the left by copying itself.

The input can be formatted as a matrix:

```js
[
    ['.', '.', '#', '.'],
    ['#', '#', '.', '.']
]
```

## First puzzle

The objective is to count the amount occupied squares that we visit from the starting position to the last row, following the slope `3 right, 1 down`.

The idea is to check all positions of the form `(i, 3i)`, with `0 < i < n`. Since it is possible that `3i >= m` for some values of `i`, we actually need to check positions of the form `(i, 3i % m)` (remember that the map extends infinitely to the left by copying itself).

**Complexity:**

- Time: `O(n)`
- Memory: `O(1)`

## Second puzzle

The objective is to count the amount occupied squares that we visit from the starting position to the last row, following the slope `r right, d down`.

The idea is to generalise the position formula of the first puzzle. Since we're moving down with steps of size `d`, we know our positions will be of the form `(di, ri)` with `0 < i < n/r`. Again, to prevent going out of bound for the second coordinate, we actually need to check position of the form `(di, ri % m)`.

**Complexity:**

- Time: `O(n)`
- Memory: `O(1)`