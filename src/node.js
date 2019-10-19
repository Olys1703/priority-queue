class Node {
	constructor(data, priority) {
		this.data = data
		this.priority = priority
		this.parent = null
		this.left = null
		this.right = null
	}

	appendChild(node) {
		if(!this.left) {
			this.left = node
		}
		else if (!this.right) {
			this.right = node
		}
		else return
		node.parent = this
		
	}

	removeChild(node) {
		if(this.left == node) {
			this.left = null
		} else if(this.right == node) {	
			this.right = null
		}
		else {
			throw Error()
		}
		node.parent = null
	}

	remove() {
		if(!!this.parent) {
			this.parent.removeChild(this)
		}
	}

	swapWithParent() {

		if (!!this.parent) {
			let _parent = this.parent
			let _left = this.left
			let _right = this.right
			this.parent = _parent.parent
/////////////////////////////

/////////////////////////////



			
			if (_parent.left == this) {
                this.left = _parent;
                this.right = _parent.right;
                if (this.right) this.right.parent = this;
            } else if (_parent.right == this) {
                this.left = _parent.left;
                this.right = _parent;
                if (this.left) this.left.parent = this;
			}
			

			if (this.parent) {
                if (this.parent.left == _parent) this.parent.left = this;
                else if (this.parent.right == _parent) this.parent.right = this;
            }
            if (_left) {
                _left.parent = _parent;
			}
			_parent.left = _left
            if (_right) {
                _right.parent = _parent;
			}
			_parent.right = _right
			
			_parent.parent = this
		}



		/*
		if (!!this.parent) {
			let _parent = this.parent
			let _left = this.left
			let _right = this.right
			let _parent_parent = this.parent.parent
/////////////////////////////

/////////////////////////////


			if (!!_parent_parent) {
				if(_parent == _parent_parent.left) {
					_parent_parent.left = this
				}
				else if (_parent ==_parent_parent.right) {
					_parent_parent.right = this
				}
				this.parent = _parent_parent
			}
			
			if(this == _parent.left) {
				this.left = _parent
				if (!!_parent.right) {
					this.right = _parent.right
					_parent.right.parent = this
				}
			}
			else if (this == _parent.right) {
				this.right = _parent
				if (!!_parent.left) {
					this.left = _parent.left
					_parent.left.parent = this
				}
			}
			
			if (!!_left)
			{
				_left.parent = _parent
			}
			else {
				//_parent.left = null
			}
			if (!!_right){
				_right.parent = _parent
			}
			else {
				//_parent.right = null
			}
			_parent.parent = this
			_parent.right = _right
			_parent.left = _left
		}*/
		
	}
}

module.exports = Node;
