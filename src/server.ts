import express from 'express';
import router from './router';
import { criarUsuarioPadrao } from './createUserPadrao';

// Servidor
const app = express();
app.use(express.json());

// Rotas
app.use(router);

// Cria o usuário padrão antes de subir o servidor
criarUsuarioPadrao().then(() => {
  app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
  });
});