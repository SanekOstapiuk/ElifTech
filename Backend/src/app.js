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
