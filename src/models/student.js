const mongoose = require('mongoose');

const studentsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
  avgMark: { type: Number, required: true },
  onDuty: { type: Boolean, default: false }
}, { timestamps: true, versionKey: false });

const StudentsCollection = mongoose.model('Student', studentsSchema);

const getAllStudents = async () => {
  return await StudentsCollection.find();
};

const getStudentById = async (studentId) => {
  return await StudentsCollection.findById(studentId);
};

module.exports = { StudentsCollection, getAllStudents, getStudentById };
