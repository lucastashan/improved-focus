import React from 'react'

interface ButtonProps {
  label?: string
  svg?: React.ReactNode
  style?: string
  type?: 'button' | 'submit'
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
  label,
  svg,
  style,
  type,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`button rounded-md ${style}`}
      type={type || 'button'}
    >
      {svg || label}
    </button>
  )
}

export default Button
