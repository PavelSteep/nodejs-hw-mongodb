import createHttpError from 'http-errors';
import {
  getContacts,
  getContactById,
  createContact,
  upsertContact,
  deleteContactById,
} from '../db/services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilters } from '../utils/parseFilters.js';
import { processPayload } from '../utils/processPayload.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';

export const createContactController = async (req, res) => {
  const { _id: userId } = req.user;

  const processed = processPayload(req.body);
  const contact = await createContact({ ...processed, userId });

  res.status(201).json({
    status: 201,
    message: 'Contact is created',
    data: contact,
  });
};

// Получение всех контактов с пагинацией и сортировкой
export const getContactsController = async (req, res, next) => {
  const { _id: userId } = req.user;
  try {
    const { page = 1, perPage = 10 } = parsePaginationParams(req.query);
    const { sortOrder = 'asc', sortBy = 'name' } = parseSortParams(req.query);
    const filter = parseFilters(req.query);
    filter.userId = userId;

    const contacts = await getContacts({
      page,
      perPage,
      sortOrder,
      sortBy,
      filter,
    });

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts.data,
      pagination: {
        page: contacts.page,
        perPage: contacts.perPage,
        totalItems: contacts.totalItems,
        totalPages: contacts.totalPages,
        hasPreviousPage: contacts.hasPreviousPage,
        hasNextPage: contacts.hasNextPage,
      },
    });
  } catch (error) {
    console.error('Error occurred while getting contacts:', error);
    next(error);
  }
};

// Получение контакта по ID
export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const contact = await getContactById({ contactId, userId });

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
export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const photo = req.file;
  const { body } = req;
  const { _id: userId } = req.user;

  let photoUrl;

  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await upsertContact(contactId, {
    ...req.body,
    photo: photoUrl,
  });

  if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  const { contact } = await upsertContact(contactId, body, userId, {
    upsert: false,
  });

  res.json({
    status: 200,
    message: 'Contact is updated',
    data: result.contact,
  });
};

// Создание или обновление контакта
export const putContactController = async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;
  const { _id: userId } = req.user;

  const processed = processPayload(body);
  const result = await upsertContact(contactId, processed, userId, {
    upsert: true,
  });

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
  const { _id: userId } = req.user;

  const contact = await deleteContactById({ contactId, userId });

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
