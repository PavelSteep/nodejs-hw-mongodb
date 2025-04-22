import mongoose from 'mongoose';
import { model, Schema } from 'mongoose';
import { CONTACT_TYPES } from '../../constants/contactTypes.js';

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female', 'other'],
    },
    avgMark: {
      type: Number,
      required: true,
    },
    onDuty: {
      type: Boolean,
      required: true,
      default: false,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    phoneNumber: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: false },
    isFavourite: { type: Boolean, required: false, default: false },
    contactType: {
      type: String,
      required: true,
      enum: Object.values(CONTACT_TYPES),
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ContactCollection = model('contacts', contactSchema);
export default ContactCollection;
