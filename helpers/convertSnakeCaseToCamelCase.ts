export const convertSnakeCasetoCamelCase = (str: string): string => {
  //TODO: test
  return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
};
