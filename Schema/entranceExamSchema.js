import mongoose from "mongoose";

const entranceExamSchema = new mongoose.Schema({
    type: {
        type: String
    },
    subType: {
        type: String
    },
    content: {
        type: String
    },
    date: {
        type: String
    },
    examLink: {
        type: String
    },
    examName: {
        type: String
    },
    endDate: {
        type: String
    },
    dateofExam: {
        type: String
    },
    examFee: {
        type: Number
    },
})

export const EntranceModel = new mongoose.model("AddEntrance", entranceExamSchema)
