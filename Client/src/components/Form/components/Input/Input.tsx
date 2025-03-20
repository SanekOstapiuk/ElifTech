import React from 'react'
import classNames from "classnames/bind";

import styles from './Input.module.css'
const cx = classNames.bind(styles)

type TypeInput = {
  type?: 'text' | 'single-choice' | 'multiple-choice';
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  className?: string
}

const Input: React.FC<TypeInput> = ({type = 'text', className, ...args}) => {
  return (<input className={cx('input', className)} type={type} {...args}/>)
}

export default Input
