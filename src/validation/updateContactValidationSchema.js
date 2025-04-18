import Joi from 'joi';
import { GENDERS } from '../constants/gender.js';

export const updateContactValidationSchema = Joi.object({
  name: Joi.string().min(3).max(40),
  phoneNumber: Joi.string().pattern(/^\+?[0-9\s\-()]+$/),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...Object.values(GENDERS)).required(),
}).min(1);

export default updateContactValidationSchema;
