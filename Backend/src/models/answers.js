import { Schema, model } from 'mongoose'

const answerSchema = new Schema({
  question: { type: String, required: true },
  answers: {type: [String], required: true},
})

const answersSchema = new Schema({
  answers: { type: [answerSchema], required: true },
  quizId: { type: String, required: true },
  time: {type: String, required: true}
});

export default model("Answers", answersSchema);
