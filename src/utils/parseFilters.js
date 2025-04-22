import { CONTACT_TYPES } from '../constants/contactTypes.js';

export const parseFilters = (filter = {}) => {
  const parsed = {};

  // Фильтр по избранным
  if (filter.isFavourite !== undefined) {
    parsed.isFavourite = filter.isFavourite === 'true';
  }

  // Фильтр по типу контакта
  if (filter.type && Object.values(CONTACT_TYPES).includes(filter.type)) {
    parsed.contactType = filter.type;
  }

  return parsed;
};
