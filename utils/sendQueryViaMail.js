import nodemailer from "nodemailer";
import * as dotenv from 'dotenv';
dotenv.config();

const sendMailtoAdmin = async(email, query, domain) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: process.env.PORT,
            secure: Boolean(process.env.SECURE),
            auth: {
                user: "djangomozilla@gmail.com",
                pass: "gbaafbpjcbnbgorr"
            }
        })
        await transporter.sendMail({
            from: process.env.USER,
            to: "msawadh06@gmail.com",
            subject: `A suggestion is sent by ${email} on the ${domain} category`,
            text: `The suggestion for the FAQ from the ${email} as follows:
                ${query}`
        })
    }catch(err){
        console.log("Email not sent", err)
    }
}

export default sendMailtoAdmin;
