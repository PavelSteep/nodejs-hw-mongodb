export const parseSortParams = (query) => {
  // Проверяем и устанавливаем порядок сортировки
  const sortOrder = ['asc', 'desc'].includes(query.sortOrder) ? query.sortOrder : 'asc'; // по умолчанию сортировка по возрастанию
  
  // Проверяем поле для сортировки, если оно существует в модели, то используем его
  const sortBy = ['name', 'phoneNumber', 'email', 'isFavourite', 'contactType'].includes(query.sortBy)
    ? query.sortBy
    : 'name';  // по умолчанию сортируем по имени контакта
  
  return { sortOrder, sortBy };
};
