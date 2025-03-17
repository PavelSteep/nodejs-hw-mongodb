import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import contactsRoutes from './services/contacts.js';
import getEnvVar from './utils/getEnvVar.js';

const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(pino());
  app.use(express.json());

  // Подключаем маршруты
  app.use('/contacts', contactsRoutes);

  app.get("/", (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.get("/error", (req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  const PORT = getEnvVar('PORT', 3000);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  return app;
};

export default setupServer;
