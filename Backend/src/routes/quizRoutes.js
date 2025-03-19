import express from 'express';

import {
  getQuizzes,
  removeQuiz,
  updateQuiz,
  addQuiz,
  getQuiz
} from '../controllers/quizzesController.js';

const router = express.Router();

router.get('/quizzes', getQuizzes);
router.post('/addQuiz', addQuiz);
router.post('/updateQuiz/:quizId', updateQuiz);
router.get('/getQuiz/:quizId', getQuiz);
router.delete('/removeQuiz/:id', removeQuiz);

export default router;
