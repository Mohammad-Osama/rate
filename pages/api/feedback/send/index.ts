import { NextApiRequest, NextApiResponse } from "next"
import nodemailer from 'nodemailer';


export default async function controller(req: NextApiRequest, res: NextApiResponse) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_EMAIL_PASSWORD,
            },
        });
    
        const mailOptions = {
            from: process.env.MY_EMAIL,
            to: process.env.MY_EMAIL,
            subject: "New Feedback",
    
            text: `New Enquiry From: ${req.body.name}
                      \n Subject: ${req.body.subject}
                      \n Message: ${req.body.message}        
                `,
        }
    
        transporter.sendMail(mailOptions/* , function (error, info) {
            if (error) {
                res.status(400).send("Error")
                res.end()
            } else {
                res.status(200).send("Success")
            }
        } */);  
        res.status(200).send("Success")
    } catch (error) {
        res.status(400).json(`Error==>${error}`);
    }
    
  
}