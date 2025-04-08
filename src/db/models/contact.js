import { model, Schema } from 'mongoose';

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: false,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  age: { type: Number, required: true },
  gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
  avgMark: { type: Number, required: true },
  onDuty: { type: Boolean, default: false, required: true },
}, {
  timestamps: true,
  versionKey: false,
});

export const ContactCollection = model('contacts', contactSchema);
