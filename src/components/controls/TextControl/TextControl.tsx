import { Input } from 'components/base/Input/Input'
import React from 'react'
import sharedStyles from 'styles/shared.module.scss'

export interface TextControlProps {
  value: string
  name: string
  label?: string
  placeholder?: string
  onChange?: (value: string) => void
}

export function TextControl({ label, value, placeholder, name, onChange }: TextControlProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.value)
  }

  return (
    <div className={sharedStyles.control}>
      {label && <div className={sharedStyles.controlLabel}>{label}</div>}
      <Input value={value} placeholder={placeholder} name={name} onChange={handleChange} />
    </div>
  )
}
