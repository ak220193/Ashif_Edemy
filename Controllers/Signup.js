import bcrypt from "bcrypt";
import { userModel } from "../Schema/userSchema.js";
import VerifyMail from "../utils/sendMail.js";

import JWT from "jsonwebtoken";
import * as dotenv from 'dotenv';
dotenv.config();

export const signup = async (req, res) => {
  const { userFirstName, userLastName, userEmail, userPassword, userAffiliation, verified } = req.body;
  userModel.findOne({ userEmail: req.body.userEmail }, async (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data) {
        res.send({
          message:
            "The Email has been taken already!!! Please enter a new Email ID",
          response: "Email Exits",
        });
      } else {
        if (!(userFirstName && userLastName && userEmail && userPassword && userAffiliation)) {
          return res
            .status(422)
            .send({ message: "Inefficient data", response: "Inefficient" });
        }

        req.body.userID = Math.floor(1000 + Math.random() * 9000);
        const user = new userModel(req.body);
        const salt = await bcrypt.genSalt(10);
        user.userPassword = await bcrypt.hash(user.userPassword, salt);
        const emailToken = JWT.sign({
          userFirstName: userFirstName
        }, process.env.PASS, {expiresIn: "1h"})

        if(!verified || userAffiliation != 0){
          VerifyMail(userEmail, userFirstName, emailToken)
        }

        user.save((err, data) => {
          if (err) {
            return res.send(err);
          }
          return res.status(200).send({
            message: ("User's data have been added successfully!!!"),
            response: (verified ? "success":"waiting"),
          });
        });
      }
    }
  });
};

// export const verifymailByUrl = async(req, res) => {
//   let {userEmail} = req.params
//   try {
//     const findUser = userModel.findOne({userEmail: userEmail})
//   if(!findUser){
//     return res.status(400).send({message: "Invalid Link"})
//   }
//   await userModel.updateOne({verified: true})
//   res.status(200).send({message: "Email verified successfully"})
//   }catch (err) {
//     console.log(err)
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// }

export const verifymailByUrl = async (req, res) => {
  const { userEmail } = req.params;

  if (!userEmail) {
    return res.status(400).send({ message: "Missing userEmail parameter" });
  }

  try {
    const user = await userModel.findOne({ userEmail });
    if (!user) {
      return res.status(400).send({ message: "Invalid Link" });
    }

    user.verified = true;
    await user.save();

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

