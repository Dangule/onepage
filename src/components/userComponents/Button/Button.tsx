import { PropsWithChildren } from 'react'
import styles from './button.module.scss'
import React from 'react'

export type ButtonSize = 'xs' | 's' | 'm' | 'l' | 'xl'
export type PositionX = 'left' | 'center' | 'right'
export type PositionY = 'top' | 'middle' | 'bottom'

export interface ButtonProps {
  text: string
  size?: ButtonSize
  action?: string
  position?:
    | 'left top'
    | 'center top'
    | 'right top'
    | 'left middle'
    | 'center middle'
    | 'right middle'
    | 'left bottom'
    | 'center bottom'
    | 'right bottom'

  onClick?: () => void
}

type SizeMap = { [key in ButtonSize]: string }
type PositionXMap = { [key in PositionX]: string }
type PositionYMap = { [key in PositionY]: string }

export const Button = React.memo(
  ({ size = 'm', position = 'left top', text, onClick }: PropsWithChildren<ButtonProps>) => {
    const [positionX, positionY] = position.split(' ') as [PositionX, PositionY]

    const positionXClasses: PositionXMap = {
      left: styles['pos-left'],
      center: styles['pos-center'],
      right: styles['pos-right'],
    }

    const positionYClasses: PositionYMap = {
      top: styles['pos-top'],
      middle: styles['pos-middle'],
      bottom: styles['pos-bottom'],
    }

    const buttonPositionXClass = positionXClasses[positionX]
    const buttonPositionYClass = positionYClasses[positionY]

    const sizeClasses: SizeMap = {
      xs: styles['size_extra-small'],
      s: styles.size_small,
      m: styles.size_medium,
      l: styles.size_large,
      xl: styles['size_extra-large'],
    }

    const buttonSizeClass = sizeClasses[size]

    return (
      <button
        className={`${styles.button} ${buttonSizeClass} ${buttonPositionXClass} ${buttonPositionYClass}`}
        onClick={onClick}
      >
        {text}
      </button>
    )
  }
)
