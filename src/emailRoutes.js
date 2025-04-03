// routes/contact.js
import express from 'express';
import { body, validationResult } from 'express-validator';
import transporter from './config/nodemailer.js';
import emailQueue from './config/bullQueue.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post(
  '/send-email',
  [
    body('name').notEmpty().withMessage('O nome é obrigatório'),
    body('email').isEmail().withMessage('Informe um email válido'),
    body('subject').notEmpty().withMessage('O assunto é obrigatório'),
    body('message').notEmpty().withMessage('A mensagem é obrigatória'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;
    const mailOptions = {
      from: email,
      to: process.env.SMTP_USER,
      subject: subject,
      text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`,
    };

    try {
      // Tenta enviar o email imediatamente
      await transporter.sendMail(mailOptions);
      console.log('Email enviado com sucesso');
    } catch (error) {
      console.error('Falha ao enviar o email, adicionando na fila:', error);
      // Caso ocorra falha, adiciona na fila para retentativa
      await emailQueue.add({ mailOptions }, { attempts: 5, backoff: 5000 });
      console.log('Email adicionado na fila');
    }

    // Retorna feedback imediato ao usuário
    res.json({
      message:
        'Obrigado! Sua mensagem foi recebida.',
    });
  }
);

export default router;
