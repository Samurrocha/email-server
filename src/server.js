import cors from 'cors';
import dotenv from'dotenv'
import express from 'express';
import bodyParser from 'body-parser';
import sendEmailRoute from './emailRoutes.js';

dotenv.config();
const app = express();

app.use(
    cors({
      origin: 'http://localhost:5173', // Permite apenas essa origem
      methods: ['POST'], // Métodos HTTP permitidos
      allowedHeaders: ['Content-Type'], // Cabeçalhos permitidos
    })
  );

app.use(bodyParser.json());

// Rota para o endpoint de contato
app.use('/api', sendEmailRoute);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erro interno do servidor');
});

const SERVER_PORT = process.env.SERVER_PORT;
app.listen(SERVER_PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${SERVER_PORT}`);
});
