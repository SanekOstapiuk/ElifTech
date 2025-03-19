import { useParams } from 'react-router-dom';
import { useEffect} from "react";
import axios from "axios";

import QuestionForm from '../../components/QuestionForm'

export default function EditPage() {
  const { quizId } = useParams()
  const path = `updateQuiz/${quizId}`

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/api/getQuiz/${quizId}`)
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <QuestionForm currPath={path} />
    </div>
  )
}
