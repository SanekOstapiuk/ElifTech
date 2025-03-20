import React from 'react'
import classnames from 'classnames/bind'

import { TypeChoice } from '../../../../types/quizTypes'
import styles from './CheckBox.module.css'

const cx = classnames.bind(styles);

type TypeCheckBox = {
	className: string,
	type: 'text' | 'multiple-choice' | 'single-choice',
	options?: TypeChoice[]
}

const CheckBox: React.FC<TypeCheckBox> = ({className, type, options, ...args}) => {
	return (
		<div className={cx('root', className)}>
			{options?.map((option) => (
				<label className={cx('label')} key={option._id}>
					<input type="checkbox" value={option._id} {...args}/>
					{option.choice}
				</label>
			))}
		</div>
	)
}

export default CheckBox;
