import React from 'react'

interface ButtonProps {
  label?: string
  svg?: React.ReactNode
  style?: string
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ label, svg, style, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`button rounded-md ${style}`}
      type="button"
    >
      {svg || label}
    </button>
  )
}

export default Button
