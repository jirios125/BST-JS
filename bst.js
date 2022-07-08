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
        if (node === null) {
            this.root = new TreeNode(data);
        } else {
            const searchTree = function(node) {
                if (data < node.data) {
                    if (node.left === null) {
                        node.left = new TreeNode(data);
                    } else if (node.left !== null) {
                        return searchTree(node.left);
                    }
                } else if (data > node.data) {
                    if (node.right === null) {
                        node.right = new TreeNode(data);
                    } else if (node.right !== null) {
                        return searchTree(node.right);
                    }
                } else {
                    return null;
                }
            };
            return searchTree(node);
        }
    }
}

function buildBT(){
    const BST = new BinarySerchTree();

    let numbers = [33,22,66,77,88,9,3];

    for (let n in numbers){
        BST.add(numbers[n])
    }

    console.log(BST);
    console.log(BST.root.left);
    console.log(BST.root.right);
}


buildBT();

