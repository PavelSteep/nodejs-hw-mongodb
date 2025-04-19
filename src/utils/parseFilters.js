import { GENDERS } from '../constants/gender.js';

export const parseFilters = (filter = {}) => {
  const parsed = {};

  if (filter.name) parsed.name = filter.name;
  if (filter.phoneNumber) parsed.phoneNumber = filter.phoneNumber;
  if (filter.email) parsed.email = filter.email;
  if (filter.isFavourite !== undefined) parsed.isFavourite = filter.isFavourite === 'true' || filter.isFavourite === true;
  if (filter.contactType && GENDERS.includes(filter.contactType)) {
    parsed.contactType = filter.contactType;
  }

  return parsed;
};





// import { parseGender } from './parseGender.js';
// import { parseBoolean } from './parseBoolean.js';
// import { parseNumber } from './parseNumber.js';
// import { GENDERS } from '../constants/gender.js';

// export const parseFilters = (filter = {}) => {
//   const parsed = {
//     name: filter.name || '',
//     phoneNumber: filter.phoneNumber || '',
//     email: filter.email || '',
//     isFavourite: filter.isFavourite !== undefined ? Boolean(filter.isFavourite) : false, // если не передано, будет false
//     contactType: filter.contactType && GENDERS.includes(filter.contactType) ? filter.contactType : GENDERS[0],
//   };

//   return parsed;
// };
