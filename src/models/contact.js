import { StudentsCollection } from './student.js';

export const getAllStudents = async () => {
  try {
    const students = await StudentsCollection.find();
    return students;
  } catch (err) {
    throw new Error('Ошибка при получении списка студентов');
  }
};

export const getStudentById = async (studentId) => {
  try {
    const student = await StudentsCollection.findById(studentId);
    if (!student) {
      throw new Error(`Студент с ID ${studentId} не найден`);
    }
    return student;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const createStudent = async (student) => {
  try {
    const newStudent = await StudentsCollection.create(student);
    return newStudent;
  } catch (err) {
    throw new Error('Ошибка при создании студента');
  }
};

export const updateStudent = async (studentId, student) => {
  try {
    const updatedStudent = await StudentsCollection.findByIdAndUpdate(
      studentId,
      student,
      { new: true },
    );
    return updatedStudent;
  } catch (err) {
    throw new Error('Ошибка при обновлении студента');
  }
};

export const deleteStudent = async (studentId) => {
  try {
    const deletedStudent = await StudentsCollection.findByIdAndDelete(studentId);
    return deletedStudent;
  } catch (err) {
    throw new Error('Ошибка при удалении студента');
  }
};

export default {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
