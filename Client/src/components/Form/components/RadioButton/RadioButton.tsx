import React from 'react'
import classnames from 'classnames/bind'

import styles from './RadioButton.module.css'
import {TypeChoice} from "../../../../types/quizTypes.ts";

const cx = classnames.bind(styles);

type TypeRadioButton = {
	className: string,
	type: 'text' | 'multiple-choice' | 'single-choice',
	options?: TypeChoice[]
}

const RadioButton: React.FC<TypeRadioButton> = ({className, type, options, ...args}) => {
	return (
		<div className={cx('root', className)}>
			{options?.map((option) => (
				<label className={cx('label')} key={option._id}>
					<input type="radio" value={option._id} {...args}/>
					{option.choice}
				</label>
			))}
		</div>
	)
}

export default RadioButton;
