import React, { ReactNode, FormEvent } from 'react'
import classnames from 'classnames/bind'

import styles from './Form.module.css'

const cx = classnames.bind(styles);

type TypeForm = {
	children: ReactNode;
	className?: string;
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<TypeForm> = function ({className, children, ...args}) {
	return (
		<form className={cx('root', className)} {...args}>{children}</form>
	)
}

export default Form;
