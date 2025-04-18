import createHttpError from 'http-errors';
import mongoose from "mongoose";
import { 
  getContacts, 
  getContactById,
  createContact,
  upsertContact, 
  deleteContactById 
} from "../db/services/contacts.js";
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilters } from '../utils/parseFilters.js';
import { processPayload } from '../utils/processPayload.js';
import createContactValidationSchema from '../validation/createContactValidationSchema.js';
import updateContactValidationSchema from '../validation/updateContactValidationSchema.js';

// Валидация данных при создании контакта
export const createContactController = async (req, res) => {
  console.log('Body:', req.body);

  const { error } = createContactValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const processed = processPayload(req.body);
  const contact = await createContact(processed);

  res.status(201).json({
    status: 201,
    message: "Contact is created",
    data: contact,
  });
};

// Получение всех контактов с пагинацией и сортировкой
export const getContactsController = async (req, res, next) => {
  try {
    console.log('Received request for /contacts');
    
    const { page = 1, perPage = 10 } = parsePaginationParams(req.query);
    const { sortOrder = 'asc', sortBy = 'name' } = parseSortParams(req.query);
    const filter = parseFilters(req.query.filter);
    
    console.log('Params:', { page, perPage, sortOrder, sortBy, filter });

    const contacts = await getContacts({ 
      page, 
      perPage, 
      sortOrder, 
      sortBy, 
      filter 
    });

    console.log('Contacts retrieved:', contacts);

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    console.error('Error occurred while getting contacts:', error);
    next(error);
  }
};


// Получение контакта по ID
export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Contact with id ${contactId} was found!`,
    data: contact,
  });
};

// Обновление контакта
export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;

  const { error } = updateContactValidationSchema.validate(body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { contact } = await upsertContact(contactId, body, { upsert: false });

  res.json({
    status: 200,
    message: 'Contact is updated',
    data: contact,
  });
};

// Создание или обновление контакта
export const putContactController = async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;

  const { error } = updateContactValidationSchema.validate(body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const processed = processPayload(body);
  const result = await upsertContact(contactId, processed, { upsert: true });

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  const { contact, isNew } = result;
  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Contact is upserted',
    data: contact,
  });
};

// Удаление контакта по ID
export const deleteByIdController = async (req, res) => {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(400, 'Invalid contact ID format');
  }

  const contact = await getContactById(contactId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  await deleteContactById(contactId);

  res.status(204).send();
};
