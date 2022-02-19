//simple express app
import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { router } from './routes';
import cors from 'cors';
import { request } from 'https';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.get('/', (request : Request, response : Response) => {
    return response.json({
        message: 'A simple package binaries version control system',
        version: '1.0.0',
        author: 'Adryan Alencar',
        email: 'adryan.alencar@sevenfox.com.br'
    })
})

export { app };