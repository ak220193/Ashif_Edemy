import { userModel } from "../Schema/userSchema.js";

import * as dotenv from 'dotenv';
dotenv.config();

export const EditUserRole = async (req, res) => {
    const { userID, userRole } = req.body;

    const userData = userModel.findOne({ _id: userID })

    if (!userID) {
        res.send({ message: "No User ID found" })
    }
    if (!userRole) {
        res.send({ message: "No user role is assigned" })
    }

    if (userData) {
        userModel.updateOne(
            { _id: userID },
            {
                $set: {
                    superAdminStatus: true
                }
            },
            { upsert: true },
            (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    return res.send({
                        status: 200,
                        message: "updated user data",
                        data: data,
                    });
                }
            }
        )
    }
}
