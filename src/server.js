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

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0',() => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
