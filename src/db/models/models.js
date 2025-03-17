import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/, // Пример регулярного выражения для валидации номера
  },
  email: {
    type: String,
    required: false,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Валидация формата email
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  contactType: {
    type: String,
    enum: ['work', 'home', 'person'],
    required: true,
    default: 'person',
  },
}, {
  timestamps: true, // автоматически добавляет createdAt и updatedAt
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
