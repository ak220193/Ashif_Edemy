import mongoose from "mongoose";

const blogStructure = new mongoose.Schema({
    Domain: {
        type: String
    },
    subDomain: {
        type: String
    },
    title1: {
        type: String
    },
    body1: {
        type: String
    },
    title2: {
        type: String
    },
    body2: {
        type: String
    },
    title3: {
        type: String
    },
    body3: {
        type: String
    },
    title4: {
        type: String
    },
    body4: {
        type: String
    },
    title5: {
        type: String
    },
    body5: {
        type: String
    },
    title6: {
        type: String
    },
    body6: {
        type: String
    },
    title7: {
        type: String
    },
    body7: {
        type: String
    }
});

export const blogDataSchema = new mongoose.model("lppblog", blogStructure);
