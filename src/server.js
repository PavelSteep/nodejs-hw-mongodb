import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import studentsRouter from './routers/students.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = Number(getEnvVar('PORT', '3000'));

const app = express();

app.use(express.json());
app.use(cors());

app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

app.use('/students', studentsRouter);

app.use('*', notFoundHandler);

app.use(errorHandler);

export const startServer = (port = PORT) => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

// Если файл запускается напрямую, стартуем сервер
if (import.meta.url === `file://${process.argv[1]}`) {
  startServer();
}

export default app;
