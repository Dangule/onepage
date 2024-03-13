import React, { useState } from 'react'
import { ControlsPanel } from './controls/ControlsPanel/ControlsPanel'
import { Button } from './userComponents/Button/Button'
import { Layout } from './userComponents/Layout/Layout'
import { Prop, PropsMap, Tree, TreeItem } from 'models/tree'
import { TextControl } from './controls/TextControl/TextControl'
import { Control, ControlType } from 'models/control'
import { useStore } from 'hooks/useStore'
import { SizeControl } from './controls/SizeControl/SizeControl'
import { PositionControl } from './controls/PositionControl/PositionControl'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

interface Props {
  tree: Tree
}

type ElementWithoutChildren = Omit<TreeItem<PropsMap>, 'children'>

export const Page = observer(({ tree }: Props) => {
  const store = useStore()
  const { pageStore } = store

  const [activeElement, setActiveElement] = useState<ElementWithoutChildren | null>(null)
  const [controls, setControls] = useState<Control[]>([])
  const [modalPosition, setModalPosition] = useState({ left: 0, top: 0 })

  const getControls = (props: Record<string, Control | string>): Control[] => {
    return Object.entries(props)
      .filter(([_, value]) => typeof value === 'object')
      .map(([key, control]) => ({ name: key, ...(control as Control) }))
  }

  const handleElementClick = (event: React.MouseEvent<HTMLElement>, element: ElementWithoutChildren) => {
    setActiveElement(element)

    const controls: Control[] = getControls(element.props)
    setControls(controls)

    const { left, top } = (event.target as HTMLElement).getBoundingClientRect()
    setModalPosition({ left: left - 300, top })
  }

  const handleClose = () => {
    setControls([])
    setActiveElement(null)
    setModalPosition({ left: 0, top: 0 })

    console.log('Request', toJS(tree))
  }

  const updateElementProp = (name: string, value: string) => {
    if (!activeElement || !activeElement.id) return

    pageStore.updateElementProps(activeElement.id, { [name]: value })
  }

  const renderElement = <T extends PropsMap>(element: TreeItem<T>) => {
    const { id, name, props, children } = element

    const elementsMap: Record<string, React.FC<any>> = {
      button: Button,
      layout: Layout,
    }

    const Element = elementsMap[name]

    if (!Element) {
      throw new Error(`Unsupported element type: ${name}`)
    }

    const elementProps = Object.entries(props).reduce((acc, [propKey, propValue]) => {
      const isControl = typeof propValue === 'object'
      acc[propKey] = isControl ? propValue.props.value : propValue
      return acc
    }, {} as Prop)

    return (
      <Element
        key={id}
        {...elementProps}
        onClick={(event: React.MouseEvent<HTMLElement>) => handleElementClick(event, { id, name, props })}
      >
        {children.map(renderElement)}
      </Element>
    )
  }

  const renderControl = (control: Control, index: number) => {
    const { type } = control

    const controlsMap: Record<ControlType, React.FC<any>> = {
      TextControl: TextControl,
      SizeControl: SizeControl,
      PositionControl: PositionControl,
    }

    const Control = controlsMap[type]

    if (!Control) {
      throw new Error(`Unsupported control type: ${type}`)
    }

    return (
      <Control key={index} {...control.props} onChange={(value: string) => updateElementProp(control.name!, value)} />
    )
  }

  return (
    <>
      <div>{tree && renderElement(tree)}</div>

      <ControlsPanel
        show={!!controls.length}
        title={activeElement?.name || ''}
        position={modalPosition}
        onClose={handleClose}
      >
        {controls.map(renderControl)}
      </ControlsPanel>
    </>
  )
})
