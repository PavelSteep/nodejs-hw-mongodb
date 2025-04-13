import { parseNumber } from './parseNumber.js';
import { GENDERS } from '../constants/gender.js';

const parseBoolean = (string) => {
  if (['true', 'false'].includes(string)) return JSON.parse(string);
};

const parseGender = (string) => {
  if(Object.values(GENDERS).includes(string)) return string;
};

export const parseFilters = (filter = {}) => {
  return { 
    minAge: parseNumber(filter.minAge, 0),
    maxAge: parseNumber(filter.maxAge, 0),
    minAvgMark: parseNumber(filter.minAvgMark, 0),
    maxAvgMark: parseNumber(filter.maxAvgMark, 0),
    gender: parseGender(filter.gender),
    onDuty: parseBoolean(filter.onDuty), 
    phoneNumber: filter.phoneNumber,
    email: filter.email,
  };
};

