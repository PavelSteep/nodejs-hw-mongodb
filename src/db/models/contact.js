import { model, Schema } from 'mongoose';
import { GENDERS } from '../../constants/gender.js';

const contactsSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { 
      type: String, 
      required: true, 
      enum: Object.values(GENDERS),
    },
    avgMark: { type: Number, required: true },
    onDuty: { type: Boolean, default: false, required: true },
    phoneNumber: { type: String },
    email: { type: String },
    isFavourite: { type: Boolean },
    contactType: { 
      type: String, 
      enum: ['personal', 'business', 'other'],
    },
    minAge: { type: Number },
  },
  { timestamps: true, versionKey: false },
);

export const ContactCollection = model('contacts', contactsSchema);
export default ContactCollection;
