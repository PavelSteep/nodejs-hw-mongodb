const express = require('express');
const cors = require('cors');
const pino = require('pino');
const Contact = require('./models/contact');
const { getAllStudents, getStudentById } = require('./services/students'); // Импорты для работы со студентами

const app = express();
const logger = pino();

app.use(cors());

// Обработчик для получения контакта по ID
app.get('/contacts/:contactId', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${req.params.contactId}!`,
      data: contact
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact' });
  }
});

// Обработчик для получения списка всех студентов
app.get('/students', async (req, res) => {
  try {
    const students = await getAllStudents();
    res.status(200).json({ data: students });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students' });
  }
});

// Обработчик для получения студента по ID
app.get('/students/:studentId', async (req, res) => {
  try {
    const student = await getStudentById(req.params.studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ data: student });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student' });
  }
});

// Логирование всех запросов
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

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

module.exports = setupServer;
