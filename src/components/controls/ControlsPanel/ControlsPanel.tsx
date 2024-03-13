import { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'
import { useOutsideClick } from 'hooks/useOutsideClick'
import styles from './controlsPanel.module.scss'

import { ReactComponent as CloseIcon } from 'assets/icons/close.svg'
import { ReactComponent as UnionIcon } from 'assets/icons/union.svg'

interface Props {
  title: string
  show: boolean
  position: { left: number; top: number }
  onClose: () => void
}

export function ControlsPanel({ show, title, position, children, onClose }: PropsWithChildren<Props>) {
  const ref = useOutsideClick(() => {
    onClose()
  })

  if (!show) return null

  return createPortal(
    <div className={styles.modal} style={{ left: position.left, top: position.top }} ref={ref}>
      <div className={styles.header}>
        <UnionIcon className={styles.union} />
        <div className={styles.headerTitle}>{title}</div>
        <CloseIcon className={styles.close} onClick={onClose} />
      </div>
      {children}
    </div>,
    document.body
  )
}
