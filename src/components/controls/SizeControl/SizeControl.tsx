import styles from './sizeControl.module.scss'
import sharedStyles from 'styles/shared.module.scss'

export interface SizeControlProps {
  items?: string[]
  value: string
  label?: string
  onChange?: (value: string) => void
}

export function SizeControl({ label, items, value, onChange }: SizeControlProps) {
  const handleChange = (selectedSize: string) => {
    onChange && onChange(selectedSize)
  }

  return (
    <div className={sharedStyles.control}>
      {label && <div className={sharedStyles.controlLabel}>{label}</div>}

      <div className={styles.container}>
        {items?.map((item, index) => (
          <div
            key={index}
            className={`${styles.item} ${value === item ? styles.active : ''}`}
            onClick={() => handleChange(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
