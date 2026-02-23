import express from 'express';
import produtoRoutes from './routes/produtoRoutes.js';
import path from 'path';
import 'dotenv/config';

const app = express();

app.use(express.json())

app.use('/', produtoRoutes);

app.listen(process.env.SERVER_PORT, () =>{
    console.log(`Servidor rodando em http://localhost:${process.env.SERVER_PORT}`)
})