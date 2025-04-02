import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sendEmail } from "./emailService.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
    const result = await sendEmail(req.body);
    res.status(result.success ? 200 : 500).json(result);
});

app.listen(() => {
    console.log(`Servidor rodando`);
});
