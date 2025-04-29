import mongoose from 'mongoose';
import { model, Schema } from 'mongoose';
import { CONTACT_TYPES } from '../../constants/contactTypes.js';

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: false },
    isFavourite: { type: Boolean, required: false, default: false },
    contactType: {
      type: String,
      required: true,
      enum: Object.values(CONTACT_TYPES),
    },
    photo: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ContactCollection = model('contacts', contactSchema);
export default ContactCollection;
