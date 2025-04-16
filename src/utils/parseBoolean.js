export function parseBoolean(value) {
  if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  }
  return undefined;
}
