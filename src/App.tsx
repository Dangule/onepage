import { useStore } from 'hooks/useStore'
import './App.scss'
import { Page } from 'components/Page'
import { observer } from 'mobx-react-lite'

function App() {
  const store = useStore()
  const { pageStore } = store

  return (
    <div className="app">
      <Page tree={pageStore.treeManager.tree} />
    </div>
  )
}

export default observer(App)
