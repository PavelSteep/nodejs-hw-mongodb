import { parseGender } from './parseGender.js';
import { parseBoolean } from './parseBoolean.js';
import { parseNumber } from './parseNumber.js';
import { GENDERS } from '../constants/gender.js';

export const parseFilters = (filter = {}) => {
  const parsed = {
    minAge: parseNumber(filter.minAge, 0),
    maxAge: parseNumber(filter.maxAge, 0),
    minAvgMark: parseNumber(filter.minAvgMark, 0),
    maxAvgMark: parseNumber(filter.maxAvgMark, 0),
    gender: parseGender(filter.gender),
    onDuty: parseBoolean(filter.onDuty),
    phoneNumber: filter.phoneNumber,
    email: filter.email,
  };

  console.log('Parsed filters:', parsed);

  return Object.entries(parsed).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {});
};
