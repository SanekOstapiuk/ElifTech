import React from 'react'
import classNames from "classnames/bind";

import styles from './Input.module.css'
const cx = classNames.bind(styles)

type TypeInput = {
  type?: 'text' | 'email' | 'phone' | 'number' | 'password';
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  className?: string
}

const Input: React.FC<TypeInput> = ({type = 'text', label, onChange, value, className}) => {

  return (
    <label className={cx('wrapper')}>
      <span className={cx('label', className)}>{label}</span>
      <input className={cx('input')} type={type} onChange={onChange} value={value}/>
    </label>
  )
}

export default Input
