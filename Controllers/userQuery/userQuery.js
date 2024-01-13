import { userModel } from "../../Schema/userSchema.js";

import sendMailtoAdmin from "../../utils/sendQueryViaMail.js";

export const sendingQueryMail = async(req, res) => {
    const {Domain, userEmail, userQuery} = req.body;

    const data = await userModel.findOne({userEmail: userEmail});

    if(!data){
        res.status(200).send({message: "Please verify your mail"})
    }else {
        sendMailtoAdmin(userEmail, userQuery, Domain)
        res.status(200).send({message: "Your Request has been sent successfully"})
    }
}
