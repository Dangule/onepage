import { action, makeObservable, observable } from 'mobx'
import { Control } from 'models/control'
import { PropsMap, Tree, TreeItem } from 'models/tree'

class TreeManager {
  tree: Tree

  constructor(tree: Tree) {
    makeObservable(this, {
      tree: observable,
      updateNodeProps: action,
    })
    this.tree = tree
  }

  updateNodeProps(nodeId: string, newProps: Record<keyof PropsMap, any>) {
    this.findAndUpdateNode(this.tree.children, nodeId, newProps)
  }

  private findAndUpdateNode(nodes: TreeItem<PropsMap>[], nodeId: string, newProps: Record<string, any>) {
    for (const node of nodes) {
      if (node.id === nodeId) {
        for (const propName in newProps) {
          if (propName in node.props) {
            ;(node.props[propName] as Control).props.value = newProps[propName]
          }
        }
        return
      }
      if (node.children) {
        this.findAndUpdateNode(node.children, nodeId, newProps)
      }
    }
  }
}

export default TreeManager
