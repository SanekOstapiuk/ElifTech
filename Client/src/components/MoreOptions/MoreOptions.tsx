import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import DropDown from '../DropDown'

import styles from './MoreOptions.module.css'

const cx = classNames.bind(styles)

type TypeMoreOptions = {
  quizId: string;
  onDelete: (id: string) => void
}

const MoreOptions: React.FC<TypeMoreOptions> = ({quizId, onDelete}) => {
  const [showActionButtons, setShowActionButtons] = useState(false)
  const deleteQuiz = () => {
    onDelete(quizId)
    setShowActionButtons(false)
  }

  return (
    <div className={cx('icon-wrapper')}>
      <button type='button' className={cx('button-actions')} onClick={() => setShowActionButtons(!showActionButtons)} >
        <span className={cx('dot')} />
      </button>
      {showActionButtons &&
        <DropDown className={cx('action-buttons')} onClose={() => setShowActionButtons(false)}>
            <Link className={cx('link')} to={`/edit/${quizId}`}>Edit</Link>
            <Link className={cx('link')} to={`/questionnaire/${quizId}`}>Run</Link>
            <button className={cx('button-delete', 'link')} onClick={deleteQuiz} type='button'>Delete</button>
        </DropDown>
      }
    </div>
  )
}

export default MoreOptions
