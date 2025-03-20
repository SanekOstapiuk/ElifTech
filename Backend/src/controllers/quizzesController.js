import {
    getAllQuizzes,
    removeQuizById,
    updateQuizById,
    addNewQuiz,
    getQuizById,
    addNewAnswers
} from '../services/quizzesService.js';

export const getQuizzes = async (req, res) => {
    try {
        const questions = await getAllQuizzes();
        res.status(200).json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getQuiz = async (req, res) => {
    try {
        const { quizId } = req.params
        const quiz = await getQuizById(quizId);

        res.status(200).json(quiz);
    } catch (error) {
        console.error('Error fetching quiz:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const addQuiz = async (req, res) => {
    try {
        const { data } = req.body
        const quiz = await addNewQuiz(data)

        res.status(200).json({ message: 'Your quiz was successfully added.'})
    } catch (error) {
        res.status(500).json({ message: "Server error"})
    }
};

export const addAnswers = async (req, res) => {
    try {
        const { answers, time } = req.body
        const { quizId } = req.params
        const result = await addNewAnswers(answers, time, quizId)

        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: "Server error"})
    }
};


export const updateQuiz = async (req, res) => {
    try {
        const { quizId } = req.params
        const { data } = req.body
        const updateQuiz = await updateQuizById(quizId, data)

        res.status(200).json({ message: 'Your quiz was successfully updated.'})
    } catch (error) {
        res.status(500).json({ message: "Server error"})
    }
};

export const removeQuiz = async (req, res) => {
    const { id } = req.params
    const quiz = await removeQuizById(id)

    if(!quiz) {
        res.status(404).json({ message: 'Quiz not found'})
    }

    res.status(200).json({ message: 'Quiz successfully deleted'})
};
