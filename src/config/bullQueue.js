import Bull from 'bull';
import dotenv from 'dotenv';
import transporter from './nodemailer.js';

dotenv.config();

const emailQueue = new Bull('emailQueue', {
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10),
  },
});

// Processador da fila: tenta reenviar os emails armazenados
emailQueue.process(async (job) => {
  const { mailOptions } = job.data;
  console.log('Tentando reenviar email da fila...');
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email enviado com sucesso:', mailOptions.to);
    done(); // Marca o job como concluído com sucesso
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    done(error); // Marca o job como falhado para tentar novamente
  }
});

export default emailQueue;
