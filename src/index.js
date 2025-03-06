import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { initMongoDB } from './db/initMongoConnection.js';
import { startServer } from './server.js';

const app = express();

const PORT = 3000;

app.use(cors());

const bootstrap = async () => {
  await initMongoDB();
  startServer();
};

bootstrap();

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world!',
  });
});

app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});

app.use(express.json());


// Middleware для обробких помилок (приймає 4 аргументи)
app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
});

app.use('*', (req, res, next) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app, server, bootstrap };
