class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  /* DSF (Depth-first search)
   start from a given node (usually the root)
   traverse as far as you can down
   when you reach a node with no children
   or all nodes on its path have been visited
   you start backtracking
   dfs():
   1) if there is a left branch, recursively search the nodes there.
   2) add the value at the current node to the array
   3) recursively search the right branch
   O(n) -- each node is visited
 */
  dfs(values = []) {
    if (this.left) {
      values = this.left.dfs(values);
    }
    values.push(this.value);

    if (this.right) {
      values = this.right.dfs(values);
    }
    return values;
  }

  /* ORDERING: affects the order in which you get node values
  in-order traversal or search:
    - left node is visited and handled
    - then right node visited and handled
  pre-order traversal: 
    - node is handled before the branches
  post-order traversal:
    - node is handled after the branches
  (see assignment)
  */

  /* BSF (Breadth-first search)
    - works across the rows of a tree
    - top row handled 1st, then 2nd, and so on
    - tree is visited level by level
    - FIFO (first in, first out) queue needed
        - to store all of the siblings in the queue
        - and procoess them in the correct order
        - when a node is visited, it is added to the queue
        - nodes are removed from the queue
        - then their children are visited
    - O(n) -- each node needs to be visited once
   */
  bfs(tree, values = []) {
    const queue = new Queue(); // Assuming a Queue is implemented (refer to previous lesson on Queue)
    const node = tree.root;
    queue.enqueue(node);
    while (queue.length) {
      const node = queue.dequeue(); //remove from the queue
      values.push(node.value); // add that value from the queue to an array

      if (node.left) {
        queue.enqueue(node.left); //add left child to the queue
      }

      if (node.right) {
        queue.enqueue(node.right); // add right child to the queue
      }
    }

    return values;
  }
}

module.exports = BinarySearchTree;
