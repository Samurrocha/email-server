import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async ({ name, email, subject, message }) => {

    console.log({email_user:process.env.EMAIL_USER, email_password:process.env.EMAIL_PASSWORD})
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: "zwmn bvlx oroc cojc",
        },
    });

    try {
        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: process.env.EMAIL_TO,
            subject: subject,
            text: message,
        });

        return { success: true, message: "E-mail enviado com sucesso!" };
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        return { success: false, message: "Erro ao enviar e-mail." };
    }
};
