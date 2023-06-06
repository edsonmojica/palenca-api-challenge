import dotenv from 'dotenv';
import Server from './src/models/server';

// Setup dotenv
dotenv.config();

const server = new Server();

server.listen();
