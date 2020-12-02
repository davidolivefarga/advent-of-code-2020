/*
The objective is to find how many valid passwords do we have according to their
policy (the amount of characters 'char' has to be in the range [min, max]).
It's quite straight-forward, nothing fancy involved.

Total complexity: O(n * m) time / O(1) memory (n passwords of length m).
*/

const data = require("./input");

let output = 0;

const isPasswordValid = (min, max, char, password) => {
  if (password.length < min) return false;

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
