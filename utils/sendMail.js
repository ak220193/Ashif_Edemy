import nodemailer from "nodemailer";
import * as dotenv from 'dotenv';
dotenv.config();

const VerifyMail = async(email, name, token) => {
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
            to: email,
            subject: `Hi ${name} Please Verify your mail by clicking the link below`,
            text: `${process.env.BASE_URL}/verifyuseremail/${email}`
        })
        console.log("email sent successfully")
    } catch(err) {
        console.log("Email not sent", err)
    }
}

export default VerifyMail;
