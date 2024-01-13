import mongoose from "mongoose";


const QueryStructure = new mongoose.Schema({
    userEmail: {
        type: String
    },
    userQuery: {
        type: String
    }
})

export const querySchema = new mongoose.model("userQuery", QueryStructure);
