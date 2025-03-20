import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { TypeQuizData } from '../../types/quizTypes'
import QuizForm from '../../components/QuizForm'
import { API_URL } from '../../constants/apiConfig'

export default function EditPage() {
  const { quizId } = useParams()
  const path = `updateQuiz/${quizId}`
  const [data, setData] = useState<TypeQuizData | null>(null)

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/getQuiz/${quizId}`)
      setData(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return data ? (
    <div>
      <QuizForm currPath={path} data={data}/>
    </div>
  ) : (<p>Loading...</p>);
}
