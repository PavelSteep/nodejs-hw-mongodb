import Joi from "joi";

export const studentSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  age: Joi.number().integer().min(16).max(99).required(),
  email: Joi.string().email().required(),
});

export const updateStudentSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  age: Joi.number().integer().min(16).max(99).required(),
});

export const studentIdSchema = Joi.object({});
export const studentNameSchema = Joi.object({});
export const studentAgeSchema = Joi.object({});
export const studentEmailSchema = Joi.object({});
export const studentAvgMarkSchema = Joi.object({});
export const studentOnDutySchema = Joi.object({});
export const studentGenderSchema = Joi.object({});
export const studentDeletedAtSchema = Joi.object({});
export const studentCreatedAtSchema = Joi.object({});
export const studentUpdatedAtSchema = Joi.object({});

export const contactSchema = Joi.object({});
export const updateContactSchema = Joi.object({});
export const deleteContactSchema = Joi.object({});
export const getContactByIdSchema = Joi.object({});
export const createContactSchema = Joi.object({});
export const getAllContactsSchema = Joi.object({});
export const contactEmailSchema = Joi.object({});
export const contactMessageSchema = Joi.object({});
export const contactNameSchema = Joi.object({});
export const contactSubjectSchema = Joi.object({});
export const contactIdSchema = Joi.object({});
