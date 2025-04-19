import Joi from 'joi';
import { GENDERS } from '../constants/gender.js';

export const createContactValidationSchema = Joi.object({
  name: Joi.string().min(3).max(40).required(),
  phoneNumber: Joi.string().pattern(/^\+?[0-9\s\-()]+$/).required(),
  email: Joi.string().email().optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().valid(...Object.values(GENDERS)),
});

export default createContactValidationSchema;
