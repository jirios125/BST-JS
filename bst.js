/*
    Binary Serch Tree by Juan Ignacio Rios
    Test to Slingr and Veritone

    Requirements
        Implement a BST and all its methods
        The BST must be built from an array of integers
        Implement a method that returns the deepest nodes in the BST along with their depth
        Deepest Node and Depth Example:
        Input: 12,11,90,82,7,9
        Output: deepest, 9; depth, 3
 */



class TreeNode{
    constructor (data, left = null ,right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class BinarySerchTree{
    constructor() {
        this.root = null;
    }

    //Add data to the binary tree
    add(data) {
        const node = this.root;
        //If the bt doesnt exist, we create a new one
        if (!node) this.root = new TreeNode(data);
         else {
             //If the bt exists, we need to add a new node
            const searchTree = function(node) {
                //If the new node to add is bigger than the actual node
                if (data < node.data) {
                    //And if the left child of the actual node is empty, we add a new node to the left
                    if (!node.left) node.left = new TreeNode(data);
                     else if (node.left)
                         //But if the left child of the actual node is not empty, we must repeat the function with the left node.
                        return searchTree(node.left);
                } else if (data > node.data) {
                    //Same thing here
                    if (!node.right) node.right = new TreeNode(data);
                     else if (node.right)
                         return searchTree(node.right);
                } else return null;
            };
            return searchTree(node);
        }
    }

    //Remove data of the binary tree
    remove(data, currentNode = this.root) {
        if (!currentNode) return null;
        //If the value to remove is less than the current node, we go to the left node and repeat
        if (data < currentNode.data) {
            currentNode.left = this.remove(currentNode.left, data);
            return currentNode;
        }
        //If the value to remove is bigger than the current node, we go to the right and repeat
        else if (data > currentNode.data) {
            currentNode.right = this.remove(currentNode.right, data);
            return currentNode;
        } else {
            // No children
            //The node is a leaf
            if (!currentNode.left && !currentNode.right) {
                currentNode = null;
                return currentNode;
            }
            // Single Child cases
            if (!currentNode.left) return currentNode.right;
            if (!currentNode.right) return currentNode.left;

            // Both children, so need to find successor
            let currNode = currentNode.right;
            while (currNode.left !== null) {
                currNode = currNode.left;
            }
            currentNode.data = currNode.data;
            // Delete the value from right subtree.
            currentNode.right = this.remove(currentNode.right, currNode.data);
            return currentNode;
        }
    }


    //To find the max number of a tree we need to look to the rightmost node
    findMaxNum(){
        let currentNode = this.root;
        while (currentNode.right){
            currentNode = currentNode.right;
        }
        return currentNode.data;
    }

    //To find the min number of a tree we need to look to the rightmost node
    findMinNum(){
        let currentNode = this.root;
        while (currentNode.left){
            currentNode = currentNode.left
        }
        return currentNode.data;
    }

    //To find a specific node, we need to look for it
    findNode(data) {
        let currentNode = this.root;
        while (currentNode.data !== data) {
            if (data < currentNode.data) currentNode = currentNode.left;
            else currentNode = currentNode.right;
            if (!currentNode) return null;
        }
        return currentNode;
    }

    //To see if a specific node is present, we need to lookf for it and return a boolean
    isPresent (data) {
        let currentNode = this.root;
        while (currentNode) {
            if (data === currentNode.data) return true;
            if (data < currentNode.data) currentNode = currentNode.left;
            else currentNode = currentNode.right;
        }
        return false;
    }

    //To find de depth of a tree, we need to count all the childs of each root child, and return the biggest
    findDepth(currentNode = this.root) {
        if (!currentNode) return -1;
        let left = this.findDepth(currentNode.left);
        let right = this.findDepth(currentNode.right);
        if (left > right) return left + 1;
         else return right + 1;
    }


    //Find the deepest node in a tree
    findDeepest(currentNode = this.root){
        if(!currentNode) return null;

        let node = null;

        //First we make a list of the current node
        let queue = [];
        queue.push(currentNode);

        //While the list is not empty
        while(queue.length > 0){
            //We are going to remove and take the first element of the list
            node = queue.shift();
            //If that node that we remove, have a left or right child, we are going to add it to the list again
            if(node.left){
                queue.push(node.left)
            }
            if(node.right){
                queue.push(node.right)
            }
        }
        //When the list is empty, we return the deepest node
        return node.data;
    }

    //To order a list we can use a recursive function to sort the elements
    inOrder() {
        if (!this.root) return null;
        else {
            let result = [];
            //We take te root node and start the function
            function traverseInOrder(node) {
                //If we have a left node, we go to that node
                node.left && traverseInOrder(node.left);
                //If we dont, we add the node to the list
                result.push(node.data);
                //If that node that we just add have a right child, we go to that node
                node.right && traverseInOrder(node.right);
            }
            traverseInOrder(this.root);
            //We return the list
            return result;
        }
    }
}

function buildBT(){
    const BST = new BinarySerchTree();

    //Numbers to ADD
    let numbers = [12,11,90,82,7,9];

    //ADD METHOD
    for (let n in numbers){
        BST.add(numbers[n])
    }
    console.log(BST);

    //REMOVE METHOD
    // BST.remove(12);
    // console.log(BST);

    //TEST METHODS
    console.log("Max number" + BST.findMaxNum());
    console.log("Min Number" + BST.findMinNum());
    console.log("Is number present " + BST.isPresent(30));
    console.log("Node found " + BST.findNode(33))

    //ORDER METHODS
    console.log("BinaryTree in order: " + BST.inOrder());
    console.log("BinaryTree in pre-order: " + numbers);

    // // OUTPUT REQUIRED FOR THIS TEST
    console.log("Depth ", BST.findDepth());
    console.log("Deepest Node " + BST.findDeepest());
}

buildBT();

