const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null
		this.parentNodes = []
		this.heap = 0
	}

	push(data, priority) {
		let node = new Node(data, priority)
		this.heap++
		this.insertNode(node)
		this.shiftNodeUp(node)
	}

	pop() {
		if (this.isEmpty()){return}
		let detachRoot = this.detachRoot()
		this.restoreRootFromLastInsertedNode(detachRoot)
		this.shiftNodeDown(this.root)
		return detachRoot.data
	}

	detachRoot() {
			let detachRoot = this.root
			if (this.parentNodes.indexOf(this.root) != -1) {
				this.parentNodes.shift()
			}
			this.root = null
			this.heap--
			return detachRoot
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.isEmpty()) {return}
			this.root = this.parentNodes.pop();
			if (!!this.root.parent) {
				if (detached != this.root.parent) {
					if (this.root.parent.right == this.root) {
						this.parentNodes.unshift(this.root.parent)
					}
				}
				this.root.remove()
				//i never do it
				if (detached.left != this.root && !!detached.left) {
					this.root.appendChild(detached.left)
				} 
				if (detached.right != this.root && !!detached.right) {
					this.root.appendChild(detached.right)
				}
				//what's happen?????
				if (!this.root.right) {
					this.parentNodes.unshift(this.root)
				}
				
			}
								
	}

	size() {
		return this.heap
	}

	isEmpty() {
		//eeeem realy?
		if (this.root == null && this.parentNodes.length == 0) { return true}
		return false
	}

	clear() {
		this.root = null
		this.heap = 0
		this.parentNodes.length = 0
	}

	insertNode(node) {
		if (this.isEmpty()){
			this.root = node
			this.parentNodes.push(node)
		}
		else
		{
			this.parentNodes.push(node)
			this.parentNodes[0].appendChild(node)
		}
		if (!!this.parentNodes[0].left && !!this.parentNodes[0].right) {
			this.parentNodes.shift()
		}
		
	}

	shiftNodeUp(node) {
		
		if (!node.parent) { 
			this.root = node 
			return 
		}
		if (node.parent && node.priority > node.parent.priority) {
			let parent_index = this.parentNodes.indexOf(node.parent)
			let node_index = this.parentNodes.indexOf(node)
			if (node_index != -1) {
				if (parent_index != -1) {
					this.parentNodes[parent_index] = node
				}
				this.parentNodes[node_index] = node.parent
			}
			node.swapWithParent()
			this.shiftNodeUp(node)
		}
	}



	shiftNodeDown(node) {
		if (!this.isEmpty() && !!node.left) {
			let node_swap
			let node_index
			let node_swap_index
			if (!!node.left && !!node.right) {
				if (node.left.priority > node.right.priority) {
					node_swap = node.left
				}
				else {
					node_swap = node.right
				}
			}
			else {
				node_swap = node.left
			}
			if (!!node_swap) {
				if (node.priority < node_swap.priority) {
					node_swap_index = this.parentNodes.indexOf(node_swap)
					node_index =  this.parentNodes.indexOf(node)
					if (node == this.root) {
						this.root = node_swap
					}
				if (node_swap_index != -1) {
					if (node_index != -1) {
						this.parentNodes[node_index] = this.parentNodes[node_swap_index]
					}
					this.parentNodes[node_swap_index] = node
				}
				node_swap.swapWithParent()
				this.shiftNodeDown(node)
				}
			}
		}
		}
}

module.exports = MaxHeap;
