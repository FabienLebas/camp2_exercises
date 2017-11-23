/*
 ## Use some methods
 */

// Rewrite your array `digits` using `push`;
const digits = [];
for (let i = 0; i < 10; i++){
  digits.push(i);
}

// rewrite your variable `last` using `length`;
const last = digits[digits.length-1];

// create another array called `litteralDigits` from `zero` to `nine` where each array entry is a spelled-out number;
const litteralDigits = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

// use `join` to create, into the variable `allDigits`, a string like this : `zero - one ...`.
const allDigits = litteralDigits.join(' - ');
