import createHttpError from 'http-errors';
import mongoose from "mongoose";
import { ContactCollection } from '../models/contact.js';

export const getContacts = async ({ page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc', filter = {} }) => {
  try {
    const skip = (page - 1) * perPage;  // Вычисляем, сколько записей нужно пропустить
    const limit = perPage;  // Количество записей на страницу

    // Формируем запрос для фильтрации
    const query = filter ? { ...filter } : {};

    // Настройка сортировки
    const sort = {
      [sortBy]: sortOrder === 'asc' ? 1 : -1,  // Сортировка по выбранному полю
    };

    const contacts = await ContactCollection.find(query)
      .skip(skip)  // Пропускаем записи для пагинации
      .limit(limit)  // Ограничиваем количество записей на страницу
      .sort(sort);  // Сортируем по выбранному полю

    const totalItems = await ContactCollection.countDocuments(query);  // Получаем общее количество записей

    const totalPages = Math.ceil(totalItems / perPage);  // Вычисляем общее количество страниц

    return {
      data: contacts,
      page,
      perPage,
      totalItems,
      totalPages,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
    };
  } catch (error) {
    throw new Error('Error fetching contacts');
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
