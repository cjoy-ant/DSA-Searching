const indexOf = (array, value) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] == value) {
      return i;
    }
  }
  return -1;
};

// best case O(1) -- when value is the start of the array
// average case O(n) -- item is at the center of the array
// worst case O(n) -- search through entire array to find that a key doesn't exist

module.exports = indexOf;
