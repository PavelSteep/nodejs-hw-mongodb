import { ContactsCollection }  from '../db/models/models.js';

// Функция для получения всех контактов
export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

// Функция для получения контакта по ID
export const getContactById = async (studentId) => {
  const contact = await ContactsCollection.findById(studentId);
  return contact;
};
