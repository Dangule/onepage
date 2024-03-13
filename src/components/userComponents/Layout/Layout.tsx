import { PropsWithChildren } from 'react'
import styles from './layout.module.scss'

export interface LayoutProps {
  width?: string
  height?: string
}

export function Layout({ width = 'auto', height = 'auto', children }: PropsWithChildren<LayoutProps>) {
  return (
    <div
      className={styles.layout}
      style={{
        width,
        height,
      }}
    >
      {children}
    </div>
  )
}
