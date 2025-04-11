import { model, Schema } from 'mongoose';

const contactSchema = new Schema(
  {
    name: { 
      type: String, 
      required: false,
      match: /^[A-Za-z\s]+$/,
    },
    phoneNumber: { 
      type: String, 
      required: false,
      match: /^[+]*[0-9]{1,4}[ ]?([0-9]{1,4}[ ])?([0-9]{1,4}[ ])?([0-9]{4})$/,
    },
    email: { 
      type: String, 
      required: false, 
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    },
    isFavourite: { 
      type: Boolean, 
      required: false 
    },
    contactType: { 
      type: String, 
      required: false, 
      enum: ['personal', 'business', 'other'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ContactCollection = model('contacts', contactSchema);
