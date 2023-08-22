import 'dotenv/config.js';
import './config/db.js';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRouter from './router/index.router.js';

const app = express();
const PORT = process.env.PORT || 3000;

//para interpretar mensajes de tipo json
app.use(express.json());
//para que reciba datos complejos desde la url
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
//para permitir origenes cruzados (front/back)
app.use(cors());

app.use('/api', indexRouter);


app.listen(PORT, ()=>console.log('Server running on port: ' + PORT)); //puerto



