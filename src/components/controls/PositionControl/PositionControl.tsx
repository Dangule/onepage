import styles from './positionControl.module.scss'
import sharedStyles from 'styles/shared.module.scss'

import { ReactComponent as AlignLeftIcon } from 'assets/icons/align-left.svg'
import { ReactComponent as AlignCenterIcon } from 'assets/icons/align-center.svg'
import { ReactComponent as AlignRightIcon } from 'assets/icons/align-right.svg'
import { ReactComponent as AlignTopIcon } from 'assets/icons/align-top.svg'
import { ReactComponent as AlignMiddleIcon } from 'assets/icons/align-middle.svg'
import { ReactComponent as AlignBottomIcon } from 'assets/icons/align-bottom.svg'
import { PositionX, PositionY } from 'components/userComponents/Button/Button'

type Position = PositionX | PositionY

export interface PositionControlProps {
  value: Position
  label?: string
  onChange?: (value: string) => void
}

type PositionMap = { [key in Position]: React.FC }

export function PositionControl({ label, value, onChange }: PositionControlProps) {
  const selected = value.split(' ') as [PositionX, PositionY]

  const handleChange = (vector: 'x' | 'y', position: Position) => {
    let result = [...selected]

    if (vector === 'x') {
      result[0] = position as PositionX
    }

    if (vector === 'y') {
      result[1] = position as PositionY
    }

    onChange && onChange(result.join(' '))
  }

  const positionMap: PositionMap = {
    left: AlignLeftIcon,
    center: AlignCenterIcon,
    right: AlignRightIcon,
    top: AlignTopIcon,
    middle: AlignMiddleIcon,
    bottom: AlignBottomIcon,
  }

  const renderItems = (vector: 'x' | 'y', items: Position[]) => {
    return items.map((item, index) => {
      const Item = positionMap[item]
      return (
        <div
          key={index}
          className={`${styles.item} ${selected.includes(item) ? styles.active : ''}`}
          onClick={() => handleChange(vector, item)}
        >
          <Item />
        </div>
      )
    })
  }

  return (
    <div className={sharedStyles.control}>
      {label && <div className={sharedStyles.controlLabel}>{label}</div>}

      <div className={styles.container}>
        <div className={styles.container}>{renderItems('x', ['left', 'center', 'right'])}</div>
        <div className={styles.container}>{renderItems('y', ['top', 'middle', 'bottom'])}</div>
      </div>
    </div>
  )
}
