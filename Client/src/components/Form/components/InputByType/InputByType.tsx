import React from 'react'
import classNames from "classnames/bind";

import Input from '../Input';
import RadioButton from '../RadioButton';
import CheckBox from '../CheckBox';

import styles from './InputByType.module.css'
import {TypeChoice} from "../../../../types/quizTypes";

const cx = classNames.bind(styles)

type TypeInputByType = {
	type?: 'text' | 'single-choice' | 'multiple-choice';
	label?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value?: string;
	className?: string;
	autoFocus?: boolean;
	options?: TypeChoice[];
	name?: string | undefined;
}

const TypeMap = {
	'single-choice': RadioButton,
	'multiple-choice': CheckBox,
	'text': Input,
	'default': Input,
}

const InputByType: React.FC<TypeInputByType> = ({type = 'text', label, className, ...args}) => {
	const InputElement = type in TypeMap ? TypeMap[type] : TypeMap.default;
	return (
		<label className={cx('wrapper')}>
			{label && <span className={cx("label", className)}>{label}</span>}
			<InputElement className={cx('input')} type={type} {...args}/>
		</label>
	)
}

export default InputByType
