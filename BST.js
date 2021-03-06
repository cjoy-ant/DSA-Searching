class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  // FROM DSA-BST checkpoint

  insert(key, value) {
    // If the tree is empty then this key being inserted is the root node of the tree
    if (this.key == null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      /* If the tree already exists, then start at the root, 
        and compare it to the key you want to insert.
        If the new key is less than the node's key 
        then the new node needs to live in the left-hand branch */
      /* If the existing node does not have a left child, 
        meaning that if the `left` pointer is empty, 
        then we can just instantiate and insert the new node 
        as the left child of that node, passing `this` as the parent */
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        /* If the node has an existing left child, 
          then we recursively call the `insert` method 
          so the node is added further down the tree */
        this.left.insert(key, value);
      }
    } else {
      /* Similarly, if the new key is greater than the node's key 
       then you do the same thing, but on the right-hand side */
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    // If the item is found at the root then return that value
    if (this.key == key) {
      return this.value;
    } else if (key < this.key && this.left) {
      /* If the item you are looking for is less than the root 
       then follow the left child.
       If there is an existing left child, 
       then recursively check its left and/or right child
       until you find the item */
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      /* If the item you are looking for is greater than the root 
       then follow the right child.
       If there is an existing right child, 
       then recursively check its left and/or right child
       until you find the item */
      return this.right.find(key);
    }
    // You have searched the tree and the item is not in the tree
    else {
      throw new Error("Key Error");
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        /* If the node only has a left child, 
        then you replace the node with its left child */
        this._replaceWith(this.left);
      } else if (this.right) {
        /* And similarly if the node only has a right child 
        then you replace it with its right child */
        this._replaceWith(this.right);
      } else {
        /* If the node has no children then
        simply remove it and any references to it 
        by calling "this._replaceWith(null)" */
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error("Key Error");
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      } else if (this == this.parent.right) {
        this.parent.right = node;
      }
      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  // FROM DSA-SEARCHING CHECKPOINT

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

  // #5 TRAVERSAL DRILLS

  inOrder(values = []) {
    if (this.left) {
      values = this.left.inOrder(values);
    }
    values.push(this.key);
    if (this.right) {
      values = this.right.inOrder(values);
    }
    return values;
  }

  preOrder(values = []) {
    values.push(this.key);
    if (this.left) {
      this.left.preOrder(values);
    }
    if (this.right) {
      this.right.preOrder(values);
    }
    values.push(this.key);
    return values;
  }

  postOrder(values = []) {
    if (this.left) {
      this.left.postOrder(values);
    }
    if (this.right) {
      this.right.postOrder(values);
    }
    values.push(this.key);
    return values;
  }
}

module.exports = BinarySearchTree;
