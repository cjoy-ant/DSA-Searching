const binarySearch = (array, value, start, end) => {
  var start = start === undefined ? 0 : start;
  var end = end === undefined ? array.length : end;

  if (start > end) {
    return -1;
  }

  const index = Math.floor((start + end) / 2);
  const item = array[index];
  let counter = 0;

  console.log(start, end);
  if (item == value) {
    return index;
  } else if (item < value) {
    return binarySearch(array, value, index + 1, end);
  } else if (item > value) {
    return binarySearch(array, value, start, index - 1);
  }
};

// binary search only works on sorted arrays
// divide and conquer approach
// Searching and Traversal in a tree (see BST.js)
// Depth-first search (DSF)
// Breadth-first search (BSF)

module.exports = binarySearch;
