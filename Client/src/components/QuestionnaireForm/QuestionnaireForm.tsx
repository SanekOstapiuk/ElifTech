import React, { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames/bind'
import axios from 'axios';

import Container from '../Container';
import Form, { Button, InputByType } from '../Form';
import { TypeQuestion } from '../../types/quizTypes'
import { API_URL } from '../../constants/apiConfig'

import styles from './QuestionnaireForm.module.css'

const cx = classnames.bind(styles);

type TypeQuestionnaireForm = {
  questions: TypeQuestion[],
  className?: string,
  quizId?: string
}

const getFormValues = (form: HTMLFormElement, questions: TypeQuestion[]) => {
  const formData = new FormData(form)
  return questions.map(question => {
    const name = question._id;
    if (!name) return null
    const value = formData.getAll(name)
    let answer;

    switch (question.type) {
      case 'text':
        answer = [value[0]];
        break;
      case 'single-choice': {
        const singleAnswer = question?.choices.find(choice => choice._id === value[0]);
        answer = [singleAnswer?.choice]
        break;
      }
      case'multiple-choice': {
        const multipleAnswers = value.map(v => question.choices.find(c => c._id === v));
        answer = multipleAnswers.map(answer => answer?.choice)
        break;
      }
    }

    return {
      name,
      value,
      question,
      answer
    }
  })
}

const QuestionnaireForm: React.FC<TypeQuestionnaireForm> = function ({questions, className, quizId}) {
  const navigate = useNavigate()
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000)); // В секундах
    }, 1000);

    return () => clearInterval(interval); // Очистка при анмаунті
  }, []);

  const onQuestionnaireSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const form = e.target as HTMLFormElement
      const data = getFormValues(form, questions);
      const answers = data.map(item => ({
        question: item?.question.question,
        answers: item?.answer,
      }))
      const time = `${timeElapsed} sec`
      const response = await axios.post(`${API_URL}/api/addAnswers/${quizId}`, {answers, time})
      alert(response.data.message);
      navigate('/')
    } catch (error) {
      console.error('Error...', error)
    }
  }

	return (
    <Container className={cx('root', className)}>
      <Form onSubmit={onQuestionnaireSubmit}>
        <>
          <p>Час проходження: {timeElapsed} сек.</p>
          {questions.map((question, i) => (
            <InputByType
              type={question.type}
              label={`${i + 1}. ${question.question}`}
              key={i} onChange={() => null}
              options={question.choices}
              name={question._id}
            />
          ))}
          <Button className={cx('save-button')} type='submit' name='Save' />
        </>
      </Form>
    </Container>
  )
}

export default QuestionnaireForm;
