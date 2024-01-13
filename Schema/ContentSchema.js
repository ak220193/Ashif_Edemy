import mongoose from "mongoose";

const ContentModel = new mongoose.Schema({
    topic: {
        type: String
    },
    subject: {
        type: String
    },
    content: {
        type: String
    }
})

export const contentDetailsSchema = new mongoose.model(
    "Content", ContentModel
)
