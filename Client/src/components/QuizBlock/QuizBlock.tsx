import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './QuizBlock.module.css'
import QuizCard from '../QuizCard';

const cx = classNames.bind(styles)

type TypeQuiz = {
  quizName: string;
  quizDesc: string;
  questionsCount: number;
  runningCount: number;
  quizId: number;
  _id: string
}

const QuizBlock: React.FC = () => {
  const [data, setData] = useState<TypeQuiz[] | null>(null)

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response: AxiosResponse<TypeQuiz[]> = await axios.get('http://localhost:3001/api/quizzes');
        setData(response.data)
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    void fetchQuizzes();
  }, [])

  const deleteQuiz = async (quizId: string) => {
    try {
      await axios.delete(`http://localhost:3001/api/removeQuiz/${quizId}`);
      setData(prev => prev ? prev.filter(quiz => quiz._id !== quizId) : null);
    } catch (error) {
      console.error('Error deleting quiz:', error);
      throw error;
    }
  }

  return (
    <>
      {data &&
        <div className={cx('wrapper')}>
          {data.map((quiz) => (
            <QuizCard
              key={quiz._id}
              name={quiz.quizName}
              desc={quiz.quizDesc}
              quizId={quiz._id}
              count={quiz.questionsCount}
              runCount={quiz.runningCount}
              onDelete={deleteQuiz}
            />
          ))}
        </div>
      }
      <Link to='/builder' className={cx('create-quiz')}>Create new quiz</Link>
    </>
  )
}

export default QuizBlock
