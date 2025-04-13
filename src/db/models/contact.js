import { model, Schema } from 'mongoose';
import { GENDERS } from '../../constants/gender.js';

const contactsSchema = new Schema(
  { 
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: Object.values(GENDERS) },
    avgMark: { type: Number, required: true },
    onDuty: { type: Boolean, default: false, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const ContactCollection = model('contacts', contactsSchema);


// import { model, Schema } from 'mongoose';

// const contactSchema = new Schema(
//   {
//     name: { type: String, required: true },
//     phoneNumber: { type: String, required: true },
//     email: { type: String },
//     isFavourite: { type: Boolean },
//     contactType: { type: String, required: true, enum: ['personal', 'business', 'other'] },
//     minAge: { type: Number, required: true },
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//   }
// );

// export const ContactCollection = model('contacts', contactSchema);

// export default ContactCollection;
