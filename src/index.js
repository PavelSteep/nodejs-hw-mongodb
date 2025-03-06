const express = require('express');
const cors = require('cors');
const pino = require('pino');
const logger = pino();
const mongoose = require('mongoose');
const server = require('./server');

const app = express();
app.use(cors());
app.use(express.json());

// Логирование запросов
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Подключение маршрутов
app.use('/api', server);

// Обработка несуществующих маршрутов
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
const setupServer = () => {
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
};

// Подключение к MongoDB
require('./config/db');

setupServer();
