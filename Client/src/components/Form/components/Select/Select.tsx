import React from 'react'
import classNames from "classnames/bind";

import styles from './Select.module.css'
const cx = classNames.bind(styles)

type TypeSelect = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[]
}

const Select: React.FC<TypeSelect> = ({value, onChange, options}) => {

  return (
    <select
      value={value}
      onChange={onChange}
      className={cx('select')}
    >
      {options?.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  )
}

export default Select
