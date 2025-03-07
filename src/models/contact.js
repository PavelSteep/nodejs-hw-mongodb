import { StudentsCollection } from './student.js';

export const getAllStudents = async () => {
  const students = await StudentsCollection.find();
  return students;
};

export const getStudentById = async (studentId) => {
  const student = await StudentsCollection.findById(studentId);
  return student;
};

export const createStudent = async (student) => {
  const newStudent = await StudentsCollection.create(student);
  return newStudent;
};

export const updateStudent = async (studentId, student) => {
  const updatedStudent = await StudentsCollection.findByIdAndUpdate(
    studentId,
    student,
    { new: true },
  );
  return updatedStudent;
};

export const deleteStudent = async (studentId) => {
  const deletedStudent = await StudentsCollection.findByIdAndDelete(studentId);
  return deletedStudent;
};

export default {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
