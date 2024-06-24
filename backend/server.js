import express from 'express';
import connectDB from './database/mongodb.js';
import routesUserAccess from './routes/userRoutes/userAccessRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const server = express();

server.use(cors());

const PORT = process.env.PORT ;

connectDB();
server.use(express.json());



server.use('/api', routesUserAccess);




server.listen(PORT, () => console.log(`RUN server in : http://localhost:${PORT}`));
