import { Schema, model } from 'mongoose'

const choiceSchema = new Schema({
    choice: { type: String, required: true},
    id: { type: Number, required: true }
})

const questionSchema = new Schema({
    question: { type: String, required: true },
    choices: [choiceSchema],
    type: { type: String, required: true },
    id: { type: Number, required: true }
})

const quizSchema = new Schema({
    quizName: { type: String, required: true },
    quizDesc: { type: String, required: true },
    questionsCount: { type: String, required: true, default: 0 },
    runningCount: { type: Number, required: true, default: 0 },
    questions: {type: [questionSchema], required: false }
});

export default model("Quiz", quizSchema);
