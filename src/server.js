import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { getEnvVar } from './utils/getEnvVar.js';
import { getAllStudents, getStudentById } from './models/contact.js';

dotenv.config();

const app = express();
const PORT = Number(getEnvVar('PORT', '3000'));

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

app.get('/students', async (req, res) => {
  const students = await getAllStudents();
  res.status(200).json({ data: students });
});

app.get('/students/:studentId', async (req, res) => {
  const { studentId } = req.params;
  const student = await getStudentById(studentId);

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  res.status(200).json({ data: student });
});

// Middleware для обработки несуществующих маршрутов
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Middleware для обработки ошибок
app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
});

// Запуск сервера
const startServer = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Экспорт для тестирования или интеграции с другими модулями
export { app, startServer };
