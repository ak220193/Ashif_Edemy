import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
  programmeID: {
    type: String,
  },
  programmeDomain : {
    type: String,
  },
  programmeSubDomain: {
    type: String,
  },
  programmeSpecialisation: {
    type: mongoose.Mixed,
  },
  programmeLevel: {
    type: String,
  },
  degreeDescription: {
    type: String,
  },
  degreeShortName: {
    type: String,
  },
  degreeFullName: {
    type: String
  }
});

export const programSchemaModel = new mongoose.model(
  "TrialProgram",
  programSchema
);
