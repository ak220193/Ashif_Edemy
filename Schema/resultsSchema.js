import mongoose from "mongoose";

const quizResults = new mongoose.Schema({
    name: {
        type: String,
    },
    phonenum: {
        type: String
    },
    email: {
        type: String
    },
    marks: {
        type: String
    }
})

export const QuizResultsModel = new mongoose.model("Results",quizResults);
