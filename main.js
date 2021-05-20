const binarySearch = require("./binarySearch");
const linearSearch = require("./linearSearch");

const main = () => {
  // 1. How many searches
  const sortedList = [3, 5, 6, 8, 11, 12, 14, 15, 17, 18];
  /*identify the sequence of numbers that
  each recursive call wil search to find 8
    1) 0-4
    2) 2-4
    3) 3-4
    4) 3 
  */
  console.log("find 8: " + binarySearch(sortedList, 8));

  /* find 16
    1) 5-9
    2) 7-9
    3) 7-8
    4) -1
  */
  console.log("find 16: " + binarySearch(sortedList, 16));

  // 2. Adding a React UI
  let array = [
    89,
    30,
    25,
    32,
    72,
    70,
    51,
    42,
    25,
    24,
    53,
    55,
    78,
    50,
    13,
    40,
    48,
    32,
    26,
    2,
    14,
    33,
    45,
    72,
    56,
    44,
    21,
    88,
    27,
    68,
    15,
    62,
    93,
    98,
    73,
    28,
    16,
    46,
    87,
    28,
    65,
    38,
    67,
    16,
    85,
    63,
    23,
    69,
    64,
    91,
    9,
    70,
    81,
    27,
    97,
    82,
    6,
    88,
    3,
    7,
    46,
    13,
    11,
    64,
    76,
    31,
    26,
    38,
    28,
    13,
    17,
    69,
    90,
    1,
    6,
    7,
    64,
    43,
    9,
    73,
    80,
    98,
    46,
    27,
    22,
    87,
    49,
    83,
    6,
    39,
    42,
    51,
    54,
    84,
    34,
    53,
    78,
    40,
    14,
    5
  ];

  // 1) Linear Search
  const linearSearchDrill = (array, value) => {
    // linear search checks every index starting at 0 until it finds the value
    let numTries = linearSearch(array, value);
    if (numTries === -1) {
      return `We searched ${array.length} times and did not find ${value}`;
    }
    return `It took ${numTries} tries to find ${value}`;
  };

  console.log(linearSearchDrill(array, 5));
  console.log(linearSearchDrill(array, 4));

  // 2) Binary Search

  const binarySearchCounter = (array, value, start, end, counter = 0) => {
    var start = start === undefined ? 0 : start;
    var end = end === undefined ? array.length : end;

    if (start > end) {
      return counter;
    }

    const index = Math.floor((start + end) / 2);
    const item = array[index];

    // increment the counter each time this function is called
    // and it hasn't been determined that the item isn't in the array
    counter++;
    console.log(counter);
    // base case
    if (item == value) {
      return counter;
    } else if (item < value) {
      return binarySearchCounter(array, value, index + 1, end, counter);
    } else if (item > value) {
      return binarySearchCounter(array, value, start, index - 1, counter);
    }
  };

  const binarySearchDrill = (array, value) => {
    array = array.sort();
    let numTries = binarySearchCounter(array, value);
    let result = binarySearch(array, value);
    if (result === -1) {
      return `We searched ${numTries} times and did not find ${value}`;
    }
    return `It took ${numTries} tries to find ${value}`;
  };

  console.log(binarySearchDrill(array, 62));
  console.log(binarySearchDrill(array, 4));
};

module.exports = main;