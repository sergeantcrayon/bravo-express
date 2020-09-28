import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { verifyGoogleJwt } from './middleware/google';
import gameRoutes from './routes/game';
import lfgRoutes from './routes/lfg';

dotenv.config({ path: './.env' });
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(verifyGoogleJwt);

// app.use('/user', userRoutes);
app.use('/games', gameRoutes);
app.use('/lfg', lfgRoutes);

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to DB'));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));
