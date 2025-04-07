import { model, Schema } from 'mongoose';

const contactSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: false },
  gender: { type: String, required: false, enum: ['male', 'female', 'other'] },
  avgMark: { type: Number, required: true },
  onDuty: { type: Boolean, default: false, required: true },
  phoneNumber: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/, // Валидация номера телефона
  },
  email: {
    type: String,
    required: false,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  isFavourite: { type: Boolean, default: false },
  contactType: {
    type: String,
    enum: ['work', 'home', 'person'],
    required: true,
    default: 'person',
  },
}, {
  timestamps: true,
  versionKey: false,
});

export const ContactCollection = model('contacts', contactSchema);
