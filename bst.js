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
    add(data) {
        const node = this.root;
        if (!node) this.root = new TreeNode(data);
         else {
            const searchTree = function(node) {
                if (data < node.data) {
                    if (!node.left) node.left = new TreeNode(data);
                     else if (node.left)
                        return searchTree(node.left);
                } else if (data > node.data) {
                    if (!node.right) node.right = new TreeNode(data);
                     else if (node.right) return searchTree(node.right);
                } else return null;
            };
            return searchTree(node);
        }
    }

    remove(data, currentNode = this.root) {
        if (!currentNode) return null;
        if (data < currentNode.data) {
            currentNode.left = this.remove(currentNode.left, data);
            return currentNode;
        } else if (data > currentNode.data) {
            currentNode.right = this.remove(currentNode.right, data);
            return currentNode;
        } else {
            // No children
            //case 1 - a leaf node
            if (!currentNode.left && !currentNode.right) {
                currentNode = null;
                return currentNode;
            }
            // Single Child cases
            if (currentNode.left === null) return currentNode.right;
            if (currentNode.right === null) return currentNode.left;

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


    findMaxNum(){
        let currentNode = this.root;
        while (currentNode.right){
            currentNode = currentNode.right;
        }
        return currentNode.data;
    }

    findMinNum(){
        let currentNode = this.root;
        while (currentNode.left){
            currentNode = currentNode.left
        }
        return currentNode.data;
    }

    findNode(data) {
        let currentNode = this.root;
        while (currentNode.data !== data) {
            if (data < currentNode.data) currentNode = currentNode.left;
            else currentNode = currentNode.right;
            if (!currentNode) return null;
        }
        return currentNode;
    }

    isPresent (data) {
        let currentNode = this.root;
        while (currentNode) {
            if (data === currentNode.data) return true;
            if (data < currentNode.data) currentNode = currentNode.left;
            else currentNode = currentNode.right;
        }
        return false;
    }

    findDepth(currentNode = this.root) {
        if (!currentNode) return -1;
        let left = this.findDepth(currentNode.left);
        let right = this.findDepth(currentNode.right);
        if (left > right) return left + 1;
         else return right + 1;
    }

    findDeepest(currentNode = this.root){
        if(!currentNode) return null;

        let node = null;

        let queue = [];
        queue.push(currentNode);

        while(queue.length > 0){
            node = queue.shift();
            if(node.left){
                queue.push(node.left)
            }
            if(node.right){
                queue.push(node.right)
            }
        }
        return node.data;
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

    // // OUTPUT REQUIRED FOR THIS TEST
    console.log("Depth ", BST.findDepth());
    console.log("Deepest Node " + BST.findDeepest());
}

buildBT();

