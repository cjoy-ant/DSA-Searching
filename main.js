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

    // 3. Find a book
    const LIBRARY = [
      { deweyNum: "000.12", title: "Computer Science" },
      { deweyNum: "170.11", title: "Ethics" },
      { deweyNum: "320.43", title: "Political Science" },
      { deweyNum: "520.14", title: "Astronomy" },
      { deweyNum: "720.50", title: "Architecture" },
      { deweyNum: "860.27", title: "Spanish and Portugese literatures" }
    ];
    const bookFinder = (
      library,
      deweyNum,
      title,
      start = 0,
      end = library.length - 1
    ) => {
      if (start > end) {
        return -1;
      }
  
      const index = Math.floor((start + end) / 2);
      const book = library[index];
  
      console.log(start, end);
      if (book.deweyNum === deweyNum) {
        if (book.title === title) {
          return `The book '${title}' is at index ${index}`;
        }
        return -1;
      } else if (book.deweyNum < deweyNum) {
        return bookFinder(library, deweyNum, title, index + 1, end);
      } else if (book.deweyNum > deweyNum) {
        return bookFinder(library, deweyNum, title, start, index - 1);
      }
    };
  
    console.log(bookFinder(LIBRARY, "000.12", "Computer Science"));

    // 4. Searching in a BST

    /* 1) Given a  binary search tree whose in-order and pre-order traversals 
    are respectively 14 15 19 25 27 35 79 89 90 91 and 35 25 15 14 19 27 89 79 91 90. 
    What would be its postorder traversal? */

    // 14 19 15 27 25 79 90 91 89 35

    /*2) The post order traversal of a binary search tree is 5 7 6 9 11 10 8. 
    What is its pre-order traversal?*/

    // 8 6 5 7 9 10 11

    // 5. Implement different tree traversals (see BST.js)

    const dataset = [25, 15, 50, 10, 24, 35, 70, 4, 12, 18, 31, 44, 66, 90, 22];

    // preOrder(dataset) =  [25, 15, 10, 4, 12, 24, 18, 22, 50, 35, 31, 44, 70, 66, 90]
    // inOrder(dataset) =   [4, 10, 12, 15, 18, 22, 24, 25, 31, 35, 44, 50, 66, 70, 90]
    // postOrder(dataset) = [4, 10, 12, 15, 18, 22, 24, 25, 31, 35, 44, 50, 66, 70, 90]

    const traversal = (array) => {
      const tree = new BinarySearchTree();
      array.forEach((value) => tree.insert(value));
      console.log(tree.inOrder());
      console.log(tree.preOrder());
      console.log(tree.postOrder());
    };

    traversal(dataset);
};

module.exports = main;
