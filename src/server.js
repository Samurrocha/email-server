import cors from 'cors';
import dotenv from 'dotenv'
import express from 'express';
import bodyParser from 'body-parser';
import sendEmailRoute from './emailRoutes.js';

dotenv.config();
const app = express();

const allowedOrigins = ['https://www.samuellima.dev','https://samuellima.dev', 'https://portfolio-git-dev-samuels-projects-f1a2ed38.vercel.app'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Permitir chamadas sem origem (ex: curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      else return callback(new Error('Not allowed by CORS'));

    },
    methods: ['POST', 'GET'], // Métodos HTTP permitidos
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

const SERVER_PORT = process.env.SERVER_PORT || 3000;
app.listen(SERVER_PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${SERVER_PORT}`);
});
