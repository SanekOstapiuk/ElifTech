import React, { ReactNode } from 'react'
import classNames from "classnames/bind"

import styles from "./Container.module.css";

const cx = classNames.bind(styles)

type TypeContainer = {
  children: ReactNode;
  className?: string
}

const Container: React.FC<TypeContainer> = ({ children, className }) => {
  return (
    <div className={cx('container', className)}>
      {children}
    </div>
  )
}

export default Container
