import express from 'express';
import { getAllStudents, getStudentById, searchStudents } from '../services/studentsService.js';

const router = express.Router();

// Получить всех студентов
router.get('/students', async (req, res) => {
  try {
    const students = await getAllStudents();
    res.status(200).json({ data: students });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Получить студента по ID
router.get('/students/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    const student = await getStudentById(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ data: student });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Поиск студентов по имени или другим параметрам
router.get('/students/search', async (req, res) => {
  const { query } = req.query;  // Получаем строку запроса из query параметров

  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    const students = await searchStudents(query);
    res.status(200).json({ data: students });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;














// import express from 'express';
// import { getAllStudents, getStudentById } from '../services/studentsService.js';

// const router = express.Router();

// router.get('/students', async (req, res) => {
//   const students = await getAllStudents();
//   res.status(200).json({ data: students });
// });

// router.get('/students/:studentId', async (req, res) => {
//   const { studentId } = req.params;
//   const student = await getStudentById(studentId);

//   if (!student) {
//     return res.status(404).json({ message: 'Student not found' });
//   }

//   res.status(200).json({ data: student });
// });

// export default router;
