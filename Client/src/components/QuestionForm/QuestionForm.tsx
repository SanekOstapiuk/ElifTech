import React, {FormEvent, useState} from 'react';
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";

import Container from "../Container";
import Button from "./components/Button";
import Input from "./components/Input";
import Select from "./components/Select";

import styles from './QuestionForm.module.css'
import axios from "axios";

const cx = classNames.bind(styles)

type TypeQuizData = {
  quizName: string;
  quizDesc: string
}

type TypeQuestion = {
  id: number;
  question: string;
  type: 'text' | 'single choice' | 'multiple choice';
  choices: TypeChoice[];
}

type TypeChoice = {
  choice: string,
  id: number
}

type TypeQuestionForm = {
  currPath: string
}

const QuestionForm: React.FC<TypeQuestionForm> = ({currPath}) => {
  const navigate = useNavigate()
  const [quizData, setQuizData] = useState<TypeQuizData>({
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

  const updateQuizData = (value: string, type: 'quizName' | 'quizDesc') => {
    setQuizData(prev => ({...prev, [type]: value}))
  }

  const addQuestion = () => {
    setQuestions(prev => [
      ...prev,
      { id: Date.now(), question: "", type: "text", choices: [] }
    ]);
  };

  const updateQuestion = (id: number, value: string) => {
    setQuestions(prev => prev.map(question => question.id === id ? { ...question, question: value } : question));
  };

  const changeTypeQuestion = (id: number, value: TypeQuestion["type"]) => {
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
      const response = await axios.post(`http://localhost:3001/api/${currPath}`, {data})
      alert(response.data.message);
      navigate('/')
    } catch (error) {
      console.error("Error...", error)
    }
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Input
          label='Quiz name'
          value={quizData.quizName}
          onChange={(e) => updateQuizData(e.target.value, 'quizName')}
        />
        <Input
          label='Quiz description'
          value={quizData.quizDesc}
          onChange={(e) => updateQuizData(e.target.value, 'quizDesc')}
        />
        {questions.map((question, questIndex) => (
          <div key={question.id}>
            <Input
              label={`${questIndex + 1}. Question`}
              value={question.question}
              onChange={(e) => updateQuestion(question.id, e.target.value)}
            />
            <Select
              value={question.type}
              onChange={(e) => changeTypeQuestion(question.id, e.target.value as TypeQuestion["type"])}
              options={['text', 'single choice', 'multiple choice']}
            />
            <Button onClick={() => deleteQuestion(question.id)} name='Remove' />
            {question.type !== "text" && (
              <div className={cx('choice-container')}>
                {question.choices.map((choice, choiceIndex) => (
                  <div key={choice.id}>
                    <Input
                      label={`${choiceIndex + 1}. Choice`}
                      value={choice.choice}
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
        <Button type='submit' name='Save Quiz' />
      </form>
    </Container>
  );
}

export default QuestionForm
