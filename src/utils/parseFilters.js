import { GENDERS } from '../constants/gender.js';

export const parseFilters = (filter = {}) => {
  const parsed = {};

  // Фильтр по избранным
  if (filter.isFavourite !== undefined) {
    parsed.isFavourite = filter.isFavourite === 'true' || filter.isFavourite === true;
  }

  // Фильтр по типу контакта
  if (filter.type && Object.values(GENDERS).includes(filter.type)) {
    parsed.contactType = filter.type;
  }

  return parsed;
};
