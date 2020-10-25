import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import 'express-async-errors';
import './database/connection';

import routes from './routes';
import errorHandler from './errors/handler';

config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(routes);
app.use(errorHandler);

const port = process.env.HAPPY_API_PORT || 3333;
app.listen(port, () => console.log('Server listening on port ' + port));
