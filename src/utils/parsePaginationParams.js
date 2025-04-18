export const parsePaginationParams = (query) => {
  const page = parseInt(query.page, 10) || 1;  // Номер страницы, по умолчанию 1
  const perPage = parseInt(query.perPage, 10) || 10;  // Количество элементов на странице, по умолчанию 10
  
  return { page, perPage };
};
