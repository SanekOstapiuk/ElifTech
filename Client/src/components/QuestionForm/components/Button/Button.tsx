import React from 'react'
import classNames from "classnames/bind"

import styles from './Button.module.css'

const cx = classNames.bind(styles)


type TypeButton = {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  name: string;
  className?: string
}

const Button: React.FC<TypeButton> = ({onClick, type = 'button', name, className}) => {

  return (
    <button
      className={cx('button', className)}
      type={type}
      onClick={onClick}
    >
      {name}
    </button>
  )
}

export default Button
