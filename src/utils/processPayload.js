export const processPayload = ({
  firstName, 
  secondName, 
  isFavourite,
  ...payload 
}) => ({
  ...payload,
  ...(processName(firstName, secondName) 
    ? { name: processName(firstName, secondName) }
    : {}),
  ...(isFavourite !== undefined 
    ? { isFavourite: isFavourite === 'true' || isFavourite === true }
    : {}),
});
