import express from 'express';
import { getAllStudents, getStudentById, searchStudents } from '../services/studentsService.js';
import { StudentsCollection } from '../models/students.js';

const router = express.Router();

// Получить всех студентов
router.get('/', async (req, res, next) => {
  try {
    const students = await getAllStudents();
    res.json(students);
  } catch (error) {
    next(error);
  }
});

// Получить всех студентов
router.get('/students', async (req, res, next) => {
  try {
    const students = await getAllStudents();
    if (students.length === 0) {
      return res.status(404).json({ message: 'No students found' });
    }
    res.status(200).json({ data: students });
  } catch (error) {
    next(error); // Передаем ошибку в централизованный обработчик
  }
});

// Получить студента по ID
router.get('/students/:studentId', async (req, res, next) => {
  const { studentId } = req.params;
  try {
    const student = await getStudentById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ data: student });
  } catch (error) {
    next(error); // Передаем ошибку в централизованный обработчик
  }
});

// Поиск студентов по имени или другим параметрам
router.get('/students/search', async (req, res, next) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    const students = await searchStudents(query);
    if (students.length === 0) {
      return res.status(404).json({ message: 'No students found matching the query' });
    }
    res.status(200).json({ data: students });
  } catch (error) {
    next(error); // Передаем ошибку в централизованный обработчик
  }
});

export default router;
