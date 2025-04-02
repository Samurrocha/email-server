import express from "express";
import cors from "cors";
import { sendEmail } from "./emailService.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
    
    const result = await sendEmail(req.body);
    res.status(result.success ? 200 : 500).json(result);
});

const PORT = process.env.SERVER_PORT

app.listen(PORT, '0.0.0.0',() => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
