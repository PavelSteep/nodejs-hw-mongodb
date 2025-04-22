import Joi from 'joi';
import { CONTACT_TYPES } from '../constants/contactTypes.js';

export const updateContactValidationSchema = Joi.object({
  name: Joi.string().min(3).max(40),
  phoneNumber: Joi.string().pattern(/^\+?[0-9\s\-()]+$/),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...Object.values(CONTACT_TYPES)),
}).min(1);

export default updateContactValidationSchema;
