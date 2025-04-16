import Joi from 'joi';
import { GENDERS } from '../constants/gender.js';

export const createContactValidationSchema = Joi.object().keys({
  name: Joi.string().required().min(3).max(40),
  age: Joi.number().integer().required().min(6).max(120),
  gender: Joi.string().required().valid(...Object.values(GENDERS)),
  avgMark: Joi.number().required().min(1).max(12),
  onDuty: Joi.boolean().required(),
  phoneNumber: Joi.string().min(7).max(20),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('personal', 'business', 'other'),
  minAge: Joi.number().min(0),
});

export default createContactValidationSchema;
