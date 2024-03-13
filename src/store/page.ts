import { action, makeObservable, observable } from 'mobx'
import { RootStore } from './store'
import { Tree } from 'models/tree'
import TreeManager from './structures/TreeManager'
import { emptyPage } from 'template'

export class PageStore {
  rootStore: RootStore
  treeManager!: TreeManager

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore

    makeObservable(this, {
      treeManager: observable,
      createPage: action,
      createPageByTemplate: action,
      updateElementProps: action,
    })
  }

  createPage() {
    this.treeManager = new TreeManager(emptyPage)
  }

  createPageByTemplate(template: Tree) {
    this.treeManager = new TreeManager(template)
  }

  updateElementProps(elementId: string, newProps: Record<string, any>) {
    this.treeManager.updateNodeProps(elementId, newProps)
  }
}
