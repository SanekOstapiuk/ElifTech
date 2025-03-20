import React, { memo } from 'react'
import classNames from 'classnames/bind';

import MoreOptions from '../MoreOptions';

import styles from './QuizCard.module.css'

const cx = classNames.bind(styles)

type TypeQuizCard = {
  name: string;
  desc: string;
  quizId: string;
  count: number;
  runCount: number;
  onDelete: (id: string) => void
}

const QuizCard: React.FC<TypeQuizCard> = memo(({ name, desc, quizId, count, onDelete, runCount}) => {
  return (
    <div className={cx('card')}>
      <div className={cx('name')}>{name}</div>
      <div className={cx('desc')}>{desc}</div>
      <div className={cx('count')}>Questions: {count}</div>
      <div className={cx('count')}>Run: {runCount}</div>
      <MoreOptions quizId={quizId} onDelete={onDelete}/>
    </div>
  )
})

export default QuizCard
