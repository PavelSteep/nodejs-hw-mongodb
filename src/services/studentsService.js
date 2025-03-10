import { StudentsCollection } from '../models/student.js';

export const getAllStudents = async () => {
  return await StudentsCollection.find();
};

export const getStudentById = async (studentId) => {
  return await StudentsCollection.findById(studentId);
};

export const createStudent = async (student) => {
  return await StudentsCollection.create(student);
};

export const updateStudent = async (studentId, student) => {
  return await StudentsCollection.findByIdAndUpdate(studentId, student, {
    new: true,
  });
};

export const deleteStudent = async (studentId) => {
  return await StudentsCollection.findByIdAndDelete(studentId);
};

export default { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent };
