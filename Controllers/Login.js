import { userModel } from "../Schema/userSchema.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import VerifyMail from "../utils/sendMail.js";

export const login = async (req, res) => {
  const body = req.body;
  const mailId = {userEmail: body.userEmail}
  const data = await userModel.findOne(mailId);

  if (data) {
    const validPassword = await bcrypt.compare(
      body.userPassword,
      data.userPassword
    );
    if (validPassword) {
      if(!data.verified){
        VerifyMail(req.body.userEmail, "user", "token")
        res.status(200).send({message: "Please verify your Mail ID"})
      }else {
        const token = jwt.sign({ userId: data.id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.status(200).send({ message: "Login success", data, token });
      }
    } else {
      res.status(200).send({ error: "Invalid Credentials" });
    }
  } else {
    res.status(401).send({ error: "User does not exist" });
  }
};

export const userData = async (req, res) => {
  const headers = req.headers['authorization']

  if (!headers) {
    res.status(403).send({ error: 'Authorization header is missing' });
    return;
  }

  const secretkey = process.env.JWT_SECRET;
  if (!secretkey) {
    res.status(403).send({ error: 'Secret key is missing' });
    return;
  }

  const token = headers.replace('Bearer ', '');

  if (!token) {
    res.status(401).send({ error: 'JWT must be provided' });
    return;
  }

  try {
    const payload = jwt.verify(token, secretkey);

    // Assuming userModel is defined elsewhere in your code
    const user = await userModel.findOne({ _id: payload.userId });

    if (user) {
      res.status(200).send({ data: user, error: '' });
    } else {
      res.status(201).send({ error: 'User not found' });
    }
  } catch (error) {
    // Handle JWT verification errors
    console.error(error);

    if (error.name === 'JsonWebTokenError') {
      res.status(401).send({ error: 'Invalid token' });
    } else {
      res.status(500).send({ error: 'Internal server error' });
    }
  }
}

