import mongoose from "mongoose";

const resourcesSchema = new mongoose.Schema({
    SlNo: {
        type: Number
    },
    College_Code: {
        type: String
    },
    TNEA_Code: {
        type: String
    },
    College_Name: {
        type: String
    },
    ProgrammeCode: {
        type: String
    },
    Programme_Name: {
        type: String
    },
    Branch_Code: {
        type: String
    },
    GAMaxCutoff: {
        type: Number
    },
    GAMinCutoff: {
        type: Number
    },
    GSSAMaxCutoff: {
        type: Number
    },
    GSSAMinCutoff: {
        type: Number
    },
    GSSVMaxCutoff: {
        type: Number
    },
    GSSVMinCutoff: {
        type: Number
    },
    GVMaxCutoff: {
        type: Number
    },
    GVMinCutoff: {
        type: Number
    }
})

export const ResourceModel = new mongoose.model(
    "Resource", resourcesSchema
)
