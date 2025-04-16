export const parseGender = (gender) => {
  if (gender === 'Женский') return 'female';
  if (gender === 'Мужской') return 'male';
  return 'unknown';
};
