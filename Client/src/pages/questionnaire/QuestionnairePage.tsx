import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';

import QuestionnaireForm from '../../components/QuestionnaireForm';
import Container from '../../components/Container';
import { TypeQuizData } from '../../types/quizTypes'
import { API_URL } from '../../constants/apiConfig'

import styles from './QuestionnairePage.module.css'

const cx = classNames.bind(styles)

export default function QuestionnairePage() {
  const { quizId } = useParams()
  const [data, setData] = useState<TypeQuizData | null>(null)

  const fetchData = async () => {
    try {
      const resp = await axios.get(`${API_URL}/api/getQuiz/${quizId}`)
      setData(resp.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return data ? (
      <Container>
        <h1 className={cx('title')}>{data.quizName}</h1>
        <p className={cx('desc')}>{data.quizDesc}</p>
        {!!data.questions.length && (<QuestionnaireForm questions={data.questions} quizId={quizId} />)}
      </Container>
  ) : (<p>Loading...</p>);
}
