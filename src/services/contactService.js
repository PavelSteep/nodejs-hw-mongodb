import Contact from '../db/models/models.js';

// Функция для получения всех контактов
export const getContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (e) {
    throw new Error('Error while fetching contacts');
  }
};

// Функция для получения контакта по ID
export const getContactById = async (id) => {
  try {
    const contact = await Contact.findById(id);
    return contact;
  } catch (e) {
    throw new Error('Error while fetching contact by ID');
  }
};

// Функция для создания контакта
export const createContact = async (contactData) => {
  try {
    const contact = await Contact.create(contactData);
    return contact;
  } catch (e) {
    throw new Error('Error while creating contact');
  }
};

// Функция для обновления контакта
export const updateContact = async (id, contactData) => {
  try {
    const contact = await Contact.findByIdAndUpdate(id, contactData, { new: true });
    return contact;
  } catch (e) {
    throw new Error('Error while updating contact');
  }
}

// Функция для удаления контакта
export const deleteContact = async (id) => {
  try {
    const contact = await Contact.findByIdAndDelete(id);
    return contact;
  } catch (e) {
    throw new Error('Error while deleting contact');
  }
}
