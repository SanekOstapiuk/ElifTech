import Quiz from '../models/quiz.js';

export const getAllQuizzes = async () => {
    try {
        return await Quiz.find({}, { quizName: 1, quizDesc: 1, questionsCount: 1 });
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

export const updateQuestions = async (quizId, questions) => {
    try {
        const updateQuiz = await Quiz.updateOne(
          { _id: quizId },
          { $set: { questions, questionsCount: questions.length }}
        )

        return updateQuiz.modifiedCount > 0
    } catch (error) {
        throw new Error('Failed to update quiz')
    }
}

export const removeQuizById = async (id) => await Quiz.findByIdAndDelete(id)
export const addNewQuiz = async (data) => await Quiz.create(data)
