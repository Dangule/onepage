import { ButtonProps } from 'components/userComponents/Button/Button'
import { LayoutProps } from 'components/userComponents/Layout/Layout'
import { Control } from './control'

export interface PropsMap {
  button: ButtonProps
  layout: LayoutProps
}

export type ElementType = keyof PropsMap

export interface Prop {
  [key: string]: string | Control
}

export interface TreeItem<T> {
  id: string
  name: ElementType
  props: Prop
  children: TreeItem<T>[]
}

export type Tree = TreeItem<PropsMap>
