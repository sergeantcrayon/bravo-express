import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import gameRoutes from './routes/game';
import lfgRoutes from './routes/lfg';
import userRoutes from './routes/user';

dotenv.config({ path: './.env' });
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/games', gameRoutes);
app.use('/lfg', lfgRoutes);
app.use('/user', userRoutes);

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to DB'));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));
