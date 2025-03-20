import Quiz from '../models/quiz.js';
import Answers from '../models/answers.js';

export const getAllQuizzes = async () => {
    try {
        return await Quiz.find({}, { quizName: 1, quizDesc: 1, questionsCount: 1, runningCount: 1 });
    } catch (error) {
        console.error("Failed to get quizzes:", error);
        throw new Error("server error");
    }
};

export const getQuizById = async (id) => {
    try {
        return await Quiz.findById(id);
    } catch (error) {
        console.error("Failed to get quiz:", error);
        throw new Error("server error");
    }
};

export const updateQuizById = async (quizId, quiz) => {
    try {
        const updateQuiz = await Quiz.updateOne(
            { _id: quizId },
            {
                $set: {
                    quizName: quiz.quizName,
                    quizDesc: quiz.quizDesc,
                    questions: quiz.questions,
                    questionsCount: quiz.questions.length
                }
            }
        )

        return updateQuiz.modifiedCount > 0
    } catch (error) {
        throw new Error('Failed to update quiz')
    }
}

export const removeQuizById = async (id) => await Quiz.findByIdAndDelete(id)
export const addNewQuiz = async (data) => await Quiz.create(data)

export const addNewAnswers = async (data, time, quizId) => {
    try {
        const answers = {answers: [...data], time, quizId}
        await Answers.create(answers)
        await Quiz.updateOne({_id: quizId}, { $inc: { runningCount: 1}})

        return {
            success: true,
            message: 'Answers successfully created!',
        };
    } catch (error) {
        console.error('Error creating answers:', error)
    }
}
