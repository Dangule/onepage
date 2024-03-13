import { v4 as uuidv4 } from 'uuid'
import { Tree } from 'models/tree'

export const template: Tree = {
  id: uuidv4(),
  name: 'layout',
  props: { width: '404px', height: '469px' },
  children: [
    {
      id: uuidv4(),
      name: 'button',
      props: {
        text: {
          type: 'TextControl',
          props: { name: 'element', label: 'label', value: 'Button' },
        },
        action: {
          type: 'TextControl',
          props: {
            name: 'action-link',
            label: 'Action',
            value: '',
            placeholder: 'External link or existing page',
          },
        },
        size: {
          type: 'SizeControl',
          props: { label: 'Size', value: 'l', items: ['xl', 'l', 'm', 's', 'xs'] },
        },
        position: {
          type: 'PositionControl',
          props: { value: 'center middle' },
        },
      },
      children: [],
    },
  ],
}

export const emptyPage: Tree = {
  id: uuidv4(),
  name: 'layout',
  props: {},
  children: [],
}
