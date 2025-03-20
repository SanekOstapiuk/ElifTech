export type TypeQuizData = {
  quizName: string;
  quizDesc: string;
  questions: TypeQuestion[]
}

export type TypeQuestion = {
  id: number;
  _id?: string;
  question: string;
  type: 'text' | 'single-choice' | 'multiple-choice';
  choices: TypeChoice[];
}

export type TypeChoice = {
  choice: string,
  id: number,
  _id?: string
}
