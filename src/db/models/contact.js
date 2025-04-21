import { model, Schema } from 'mongoose';
import { GENDERS } from '../../constants/gender.js';

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: false },
    isFavourite: { type: Boolean, required: false, default: false, },
    contactType: {
      type: String,
      required: true,
      enum: Object.values(GENDERS),
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ContactCollection = model('contacts', contactSchema);
export default ContactCollection;
