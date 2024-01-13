import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userFirstName: {
      type: String,
      required: true,
    },
    userLastName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userPassword: {
      type: String,
      required: true,
    },
    userAffiliation: {
      type: String,
      default: "User"
    },
    userAffiliationId: {
      type: String
    },
    contentCreator: {
      type: Boolean,
      default: false
    },
    userID: {
      type: String,
    },
    superAdminStatus: {
      type: Boolean,
      default: false
    },
    verified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export const userModel = new mongoose.model("usersData", userSchema);
