import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { TypeQuizData } from '../../types/quizTypes'
import QuizForm from '../../components/QuizForm'

export default function EditPage() {
  const { quizId } = useParams()
  const path = `updateQuiz/${quizId}`
  const [data, setData] = useState<TypeQuizData | null>(null)

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/getQuiz/${quizId}`)
      setData(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <QuizForm currPath={path} data={data}/>
    </div>
  )
}
