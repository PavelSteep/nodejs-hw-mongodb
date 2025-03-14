import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
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
