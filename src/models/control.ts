import { PositionControlProps } from 'components/controls/PositionControl/PositionControl'
import { SizeControlProps } from 'components/controls/SizeControl/SizeControl'
import { TextControlProps } from 'components/controls/TextControl/TextControl'

interface PropsMap {
  TextControl: TextControlProps
  SizeControl: SizeControlProps
  PositionControl: PositionControlProps
}

export type ControlType = keyof PropsMap

export interface Control {
  name?: string
  type: ControlType
  props: PropsMap[ControlType]
}
