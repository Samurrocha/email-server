// src/config/bullQueue.js
import Bull from 'bull';
import dotenv from 'dotenv';
import transporter from './nodemailer.js';

dotenv.config();

// Se houver REDIS_URL (Upstash), use ela. Senão, use Host/Port (Local).
const emailQueue = process.env.REDIS_URL 
  ? new Bull('emailQueue', process.env.REDIS_URL)
  : new Bull('emailQueue', {
      redis: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
      },
    });

// Processador da fila
emailQueue.process(async (job) => {
  const { mailOptions } = job.data;
  console.log('Tentando processar job da fila...');

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email enviado com sucesso:', mailOptions.to);
    
    // O retorno da função marca o job como "completed".
    return { status: 'sent' }; 

  } catch (error) {
    console.error('Erro ao enviar email no processador:', error);
    
    // agendar a próxima tentativa (retry).
    throw error; 
  }
});

export default emailQueue;