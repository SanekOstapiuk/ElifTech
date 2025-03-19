import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import quizRoutes from './routes/quizRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', quizRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("API працює!");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Сервер запущено на порту ${PORT}`));

const quizSchema = new mongoose.Schema({
    quizName: String,
    quizDesc: String,
    questionsCount: Number,
});

// const Quiz = mongoose.model("Quizzes", quizSchema);
//
// async function seedQuizzess() {
//     const quizzes = [
//         {
//             quizName: "MaterialUI",
//             quizDesc: "MaterialUI description",
//             questionsCount: 2
//         },
//         {
//             quizName: "Next.js",
//             quizDesc: "Next.js description",
//             questionsCount: 3
//         },
//         {
//             quizName: "MaterialUI",
//             quizDesc: "MaterialUI description",
//             questionsCount: 2
//         },
//         {
//             quizName: "Vue.js",
//             quizDesc: "Vue.js description",
//             questionsCount: 3
//         },
//         {
//             quizName: "React",
//             quizDesc: "React description",
//             questionsCount: 2
//         },
//         {
//             quizName: "TypeScript",
//             quizDesc: "TypeScript description",
//             questionsCount: 3
//         },
//         {
//             quizName: "Angular",
//             quizDesc: "Angular description",
//             questionsCount: 2
//         },
//         {
//             quizName: "NativeReact",
//             quizDesc: "NativeReact description",
//             questionsCount: 3
//         }
//     ];
//
//     await Quiz.insertMany(quizzes);
//     console.log("Тестові запитання додано!");
// }
//
// seedQuizzess().then(() => mongoose.connection.close());

// const questions = [
//     {
//         quizId: "65f0d21b7a53a34412c3b8d1",
//         name: "Яка бібліотека використовується для стилізації MaterialUI?",
//         type: "single", // Тип питання: single / multiple
//         answers: [
//             { text: "Styled-components", correct: false },
//             { text: "Emotion", correct: true },
//             { text: "SASS", correct: false }
//         ]
//     },
//     {
//         quizId: "65f0d21b7a53a34412c3b8d1",
//         name: "Який компонент відповідає за адаптивність?",
//         type: "single",
//         answers: [
//             { text: "Grid", correct: true },
//             { text: "Box", correct: false },
//             { text: "Typography", correct: false }
//         ]
//     },
//     {
//         quizId: "65f0d21b7a53a34412c3b8d2",
//         name: "Що таке SSR в Next.js?",
//         type: "multiple",
//         answers: [
//             { text: "Server Side Rendering", correct: true },
//             { text: "Static Site Rendering", correct: false },
//             { text: "State Server Rendering", correct: false }
//         ]
//     }
// ];

