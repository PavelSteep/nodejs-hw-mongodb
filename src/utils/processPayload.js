// Объединение имени и фамилии в одно поле name
export const processName = (firstName, secondName) => {
  const fullName = `${firstName || ''} ${secondName || ''}`.trim();
  return fullName || null;
};

// Обработка и нормализация входящих данных
export const processPayload = ({
  firstName,
  secondName,
  isFavourite = false,
  ...payload
}) => {
  const fullName = processName(firstName, secondName);

  return {
    ...payload,
    ...(fullName ? { name: fullName } : {}),
    isFavourite: isFavourite === 'true' || isFavourite === true,
  };
};
