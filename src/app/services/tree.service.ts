// Interface for the node shape
interface ITreeNode {
  name: string;
  state: Record<string, any>;
  children: TreeNode[];
}

class TreeNode implements ITreeNode {
  name: string;
  state: Record<string, any>;
  children: TreeNode[];

  constructor(name: string, state: Record<string, any> = {}, children: TreeNode[] = []) {
    this.name = name;
    this.state = state;
    this.children = children;
  }

  addChild(child: TreeNode): void {
    this.children.push(child);
  }

  removeChildByName(name: string): void {
    this.children = this.children.filter(child => child.name !== name);
  }

  findNodeByName(name: string): TreeNode | null {
    if (this.name === name) return this;
    for (const child of this.children) {
      const found = child.findNodeByName(name);
      if (found) return found;
    }
    return null;
  }

  traverse(callback: (node: TreeNode) => void): void {
    callback(this);
    for (const child of this.children) {
      child.traverse(callback);
    }
  }

  // 🔄 Flatten method: returns all descendants with address paths
  flatten(): { name: string; address: string; state: Record<string, any> }[] {
    const result: { name: string; address: string; state: Record<string, any> }[] = [];

    const walk = (node: TreeNode, path: string) => {
      result.push({ name: node.name, address: path, state: node.state });
      node.children.forEach((child, index) => {
        walk(child, `${path}.${index}`);
      });
    };

    this.children.forEach((child, index) => {
      walk(child, `${index}`);
    });

    return result;
  }

  // 🧩 Static method to reconstruct tree from flattened array
  static unflatten(flatArray: { name: string; address: string; state: Record<string, any> }[]): TreeNode {
    const root = new TreeNode("root", {}); // You can customize root name/state if needed

    for (const item of flatArray) {
      const path = item.address.split(".").map(Number);
      let current = root;

      for (let i = 0; i < path.length; i++) {
        const index = path[i];

        // Ensure the child exists at this index
        if (!current.children[index]) {
          current.children[index] = new TreeNode("placeholder", {}); // Temporary placeholder
        }

        current = current.children[index];
      }

      // Overwrite placeholder with actual node data
      current.name = item.name;
      current.state = item.state;
    }

    return root;
  }

}
