import createHttpError from 'http-errors';
import mongoose from "mongoose";
import { ContactCollection } from '../models/contact.js';

export const getContacts = async () => {
  try {
    const contacts = await ContactCollection.find();
    return contacts;
  } catch (error) {
    throw new createHttpError(500, 'Error fetching contacts');
  }
};

export const getContactById = async (contactId) => {
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(400, 'Invalid contact ID format');
  }

  const contact = await ContactCollection.findById(contactId);

    if (!contact) {
      throw new createHttpError(404, 'Contact not found-getContactById in services');
    }

    return contact;
};

export const createContact = async (payload) => {
    const contact = await ContactCollection.create(payload);

    return contact;
};

export const upsertContact = async (contactId, payload, options = {}) => {
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(400, 'Invalid contact ID format');
  }

  const contact = await ContactCollection.findByIdAndUpdate(
    contactId,
    payload,
    { ...options, new: true }
  );

  if (!contact) {
    throw new createHttpError(404, 'Contact not found-upsertContact in services');
  }

  return {
    contact,
    isNew: options.upsert ?? false
  };
};

export const deleteContactById = async (contactId) => {
  await ContactCollection.findByIdAndDelete(contactId);
};
