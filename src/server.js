const express = require('express');
const router = express.Router();

const { getAllStudents, getStudentById } = require('./models/student');
const Contact = require('./models/contact');

// Обработчик для получения контакта по ID
router.get('/contacts/:contactId', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({ status: 200, message: 'Successfully found contact', data: contact });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact' });
  }
});

// Обработчик для получения всех студентов
router.get('/students', async (req, res) => {
  try {
    const students = await getAllStudents();
    res.status(200).json({ data: students });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students' });
  }
});

// Обработчик для получения студента по ID
router.get('/students/:studentId', async (req, res) => {
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

module.exports = router;
