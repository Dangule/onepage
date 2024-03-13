import styles from './input.module.scss'

interface Props {
  name: string
  value: string
  placeholder?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export function Input({ name, value, placeholder, onChange }: Props) {
  return <input className={styles.input} name={name} placeholder={placeholder} value={value} onChange={onChange} />
}
