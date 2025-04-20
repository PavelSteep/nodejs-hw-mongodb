import { GENDERS } from '../constants/gender.js';

export const parseFilters = (filter = {}) => {
  const parsed = {};

  if (filter.isFavourite !== undefined) {
    parsed.isFavourite = filter.isFavourite === 'true' || filter.isFavourite === true;
  }

  if (filter.contactType && GENDERS.includes(filter.contactType)) {
    parsed.contactType = filter.contactType;
  }

  // if (filter.name) parsed.name = filter.name;
  // if (filter.phoneNumber) parsed.phoneNumber = filter.phoneNumber;
  // if (filter.email) parsed.email = filter.email;
  // if (filter.isFavourite !== undefined) parsed.isFavourite = filter.isFavourite === 'true' || filter.isFavourite === true;
  // if (filter.contactType && GENDERS.includes(filter.contactType)) {
  //   parsed.contactType = filter.contactType;
  // }

  return parsed;
};
