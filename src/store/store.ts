import { template } from 'template'
import { PageStore } from './page'

export class RootStore {
  pageStore: PageStore

  constructor() {
    this.pageStore = new PageStore(this)
    this.pageStore.createPageByTemplate(template)
  }
}

export const store = new RootStore()
