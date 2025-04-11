import { model, Schema } from 'mongoose';

const contactSchema = new Schema(
  {
    name: { 
      type: String, 
      required: true
    },
    phoneNumber: { 
      type: String, 
      required: true
    },
    email: { 
      type: String, 
      required: false
    },
    isFavourite: { 
      type: Boolean, 
      required: false 
    },
    contactType: { 
      type: String, 
      required: true, 
      enum: ['personal', 'business', 'other']
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ContactCollection = model('contacts', contactSchema);
