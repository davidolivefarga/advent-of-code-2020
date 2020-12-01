/*
The objective is to find two different numbers of the input array
that sum 2020 and multiply them. To do this, we can go through the 
array and for each element x we will do the following process:

- If we already visited 2020 - x, we're finished, since x + (2020 - x) = 2020
- If we haven't visited 2020 - x, we store x as a visited number

Total complexity: O(n) time / O(n) memory
*/

const input = require("./puzzle1-input");

const visited = {};
let output;

for (let num of input) {
  if (visited[2020 - num]) {
    output = num * (2020 - num);
    break;
  } else {
    visited[num] = true;
  }
}

console.log(output);
