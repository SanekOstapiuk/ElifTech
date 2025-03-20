import React, {FormEvent, useEffect, useState} from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Container from "../Container";
import Form, {Button, InputByType, Select} from '../Form';
import { TypeQuizData, TypeQuestion } from '../../types/quizTypes'
import { API_URL } from '../../constants/apiConfig'

import styles from './QuizForm.module.css'

const cx = classNames.bind(styles)

type TypeQuestionForm = {
  currPath: string,
  data?: TypeQuizData | null
}

const QuizForm: React.FC<TypeQuestionForm> = ({currPath, data}) => {
  const navigate = useNavigate()
  const [quizData, setQuizData] = useState<{quizName: string, quizDesc: string}>({
    quizName: '',
    quizDesc: ''
  })

  const [questions, setQuestions] = useState<TypeQuestion[]>([
    {
      id: Date.now(),
      question: '',
      type: 'text',
      choices: [],
    }
  ])

  useEffect(() => {
    if(data) {
      setQuizData({
        quizName: data.quizName || "",
        quizDesc: data.quizDesc || "",
      });

      setQuestions(data.questions || []);
    }
  }, [data])

  const updateQuizData = (value: string, type: 'quizName' | 'quizDesc') => {
    setQuizData(prev => ({...prev, [type]: value}))
  }

  const addQuestion = () => {
    setQuestions(prev => [
      ...prev,
      { id: Date.now(), question: "", type: 'text', choices: [] }
    ]);
  };

  const updateQuestion = (id: number, value: string) => {
    setQuestions(prev => prev.map(question => question.id === id ? { ...question, question: value } : question));
  };

  const changeTypeQuestion = (id: number, value: TypeQuestion['type']) => {
    if(value === 'text') {
      setQuestions(prev => prev.map(question => question.id === id
        ? {
          ...question,
          type: value,
          choices: []
        }
        : question));
    } else {
      setQuestions(prev => prev.map(question => question.id === id
        ? {
          ...question,
          type: value,
          choices: question.choices.length === 0 ? [{ choice: '', id: Date.now() }] : question.choices
        }
        : question));
    }
  };

  const deleteQuestion = (id: number) => {
    setQuestions(prev => prev.filter(question => question.id !== id))
  };

  const addChoice = (id: number) => {
    setQuestions(prev => prev.map(question =>
      question.id === id ? { ...question, choices: [...question.choices, {choice: '', id: Date.now()}] } : question
    ));
  };

  const deleteChoice = (questionId: number, choiceId: number) => {
    setQuestions(prev => prev.map(question => question.id === questionId
      ? {
        ...question,
        choices: question.choices.filter(choice => choice.id !== choiceId)
      }
      : question)
    )
  };

  const updateChoice = (questionId: number, choiceId: number, value: string) => {
    setQuestions(prev => prev.map(question =>
      question.id === questionId ? {
        ...question,
        choices: question.choices.map((choice) => choice.id === choiceId ? { ...choice, choice: value} : choice)
      } : question
    ));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const data = {...quizData, questionsCount: questions.length, questions}
      const response = await axios.post(`${API_URL}/api/${currPath}`, {data})
      alert(response.data.message);
      navigate('/')
    } catch (error) {
      console.error('Error...', error)
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <InputByType
          label='Quiz name'
          value={quizData.quizName}
          onChange={(e) => updateQuizData(e.target.value, 'quizName')}
        />
        <InputByType
          label='Quiz description'
          value={quizData.quizDesc}
          onChange={(e) => updateQuizData(e.target.value, 'quizDesc')}
        />
        {questions.map((question, questIndex) => (
          <div key={question.id}>
            <InputByType
              label={`${questIndex + 1}. Question`}
              value={question.question}
              onChange={(e) => updateQuestion(question.id, e.target.value)}
            />
            <Select
              value={question.type}
              onChange={(e) => changeTypeQuestion(question.id, e.target.value as TypeQuestion["type"])}
              options={['text', 'single-choice', 'multiple-choice']}
            />
            <Button onClick={() => deleteQuestion(question.id)} name='Remove' />
            {question.type !== "text" && (
              <div className={cx('choice-container')}>
                {question.choices.map((choice, choiceIndex) => (
                  <div key={choice.id}>
                    <InputByType
                      label={`${choiceIndex + 1}. Choice`}
                      value={choice.choice}
                      autoFocus={true}
                      onChange={(e) => updateChoice(question.id, choice.id, e.target.value)}
                    />
                    <Button onClick={() => deleteChoice(question.id, choice.id)} name='Remove' />
                  </div>
                ))}
                <Button onClick={() => addChoice(question.id)} name='Add choice' />
              </div>
            )}
          </div>
        ))}
        <Button onClick={addQuestion} name='Add question' />
        <Button className={cx('save-btn')} type='submit' name='Save Quiz' />
      </Form>
    </Container>
  );
}

export default QuizForm
