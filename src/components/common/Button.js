import React from 'react'

const Button = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
}) => {
  const baseClasses =
    'btn border border-2 relative border-[rgba(0,0,0,0.25)] shadow-[0px_3px_4px_1px_rgba(0,_0,_0,_0.2)]'
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'bg-gray-500 text-white',
    discard: 'bg-red-500 text-white',
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
