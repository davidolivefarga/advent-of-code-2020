# Day 2 - Password Philosophy

You can find the puzzles [here](https://adventofcode.com/2020/day/2).

## Input

We're given a list of `n` passports of length `m` along their policies. 

Every line has the format `'n1-n2 c: p'`, where:

- `n1` and `n2` are positive integers
- `c` is a character
- `p` is a string representing the password

The input can be formatted to an array of elements in the form `[n1, n2, c, p]`:

```js
[
    [1, 3, 'a', 'abcde'],
    [1, 3, 'b', 'cdefg']
]
```

## First puzzle

The objective is to find the amount of valid passwords, considering that each password is valid if it contains the character `c` at least `n1` times and at most `n2` times.

The idea is to go through the password characters and count the amount of times the character `c` appears. To speed up the calculations, we can immediately discard those passwords whose length is less than `n1` and we can also stop counting the moment this amount is greater than `n2`.

**Complexity:**

- Time: `O(n * m)`
- Memory: `O(1)`

## Second puzzle

The objective is to find the amount of valid passwords, considering that each password is valid if the character `c` appears exactly once at positions `n1` and `n2`.

The idea is quite straightforward, the only interesting thing is the use of the [XOR operator ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_XOR) to check the validity condition. Also, notice that positions `n1` and `n2` are 1-indexed, so we need to subtract 1 when accessing the array.

**Complexity:**

- Time: `O(n)`
- Memory: `O(1)`