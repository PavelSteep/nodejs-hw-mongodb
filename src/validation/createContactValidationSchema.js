import Joi from 'joi';
import { CONTACT_TYPES } from '../constants/contactTypes.js';
import { isValidObjectId } from 'mongoose';

export const createContactValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  age: Joi.number().integer().min(6).max(16).required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  avgMark: Joi.number().min(2).max(12).required(),
  onDuty: Joi.boolean(),
  parentId: Joi.string().custom((value, helper) => {
		if (value && !isValidObjectId(value)) {
		return helper.message('Parent id should be a valid mongo id');
		}
		return true;
	}),
  phoneNumber: Joi.string().pattern(/^\+?[0-9\s\-()]+$/).required(),
  email: Joi.string().email().optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().valid(...Object.values(CONTACT_TYPES)).required(),
});

export default createContactValidationSchema;
