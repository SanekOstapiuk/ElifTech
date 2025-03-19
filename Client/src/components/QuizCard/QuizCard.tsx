import React, { memo } from 'react'
import classNames from "classnames/bind";

import MoreOptions from "../MoreOptions";

import styles from './QuizCard.module.css'

const cx = classNames.bind(styles)

type TypeQuizCard = {
  name: string;
  desc: string;
  quizId: string;
  count: number;
  onDelete: (id: string) => void
}

const QuizCard: React.FC<TypeQuizCard> = memo(({ name, desc, quizId, count, onDelete}) => {
  return (
    <div className={cx('card')}>
      <div>{name}</div>
      <div>{desc}</div>
      <div>Questions: {count}</div>
      <MoreOptions quizId={quizId} onDelete={onDelete}/>
    </div>
  )
})

export default QuizCard
