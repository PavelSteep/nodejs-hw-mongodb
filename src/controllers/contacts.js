import createHttpError from 'http-errors';
import mongoose from "mongoose";
import { 
  getContacts, 
  getContactById,
  createContact,
  upsertContact, 
  deleteContactById 
} from "../db/services/contacts.js";

export const getContactsController = async (req, res) => {
    const contacts = await getContacts();

    res.json({
      status: 200,
      message: 'Contact were found!',
      data: contacts,
    });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(400, 'Invalid contact ID format');
  }

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

export const createContactController = async (req, res) => {
  console.log('Body:', req.body);

  if (!req.body || Object.keys(req.body).length === 0) {
    throw createHttpError(400, 'Request body is empty or invalid');
  }
  
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: "Contact is created",
    data: contact,
  });
};

export const patchContactController = async (req, res) => {
    const { contactId } = req.params;
    const { body } = req;

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      throw createHttpError(400, 'Invalid contact ID format');
    }

    const contacts = await getContactById(contactId);
    if (!contacts) {
      throw createHttpError(404, 'Contact not found');
    }

    const { contact } = await upsertContact(contactId, body, { upsert: false });

    res.json({
      status: 200,
      message: 'Contact is updated',
      data: contact,
    });
};

export const putContactController = async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(400, 'Invalid contact ID format');
  }

  const { contact, isNew } = await upsertContact(contactId, body, { upsert: true });

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Contact is upserted',
    data: contact,
  });
};

export const deleteByIdController = async (req, res) => {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(400, 'Invalid contact ID format');
  }

  const contacts = await getContactById(contactId);
  if (!contacts) {
    throw createHttpError(404, 'Contact not found');
  }

    await deleteContactById(contactId);
    
    res.status(204).send();
};
