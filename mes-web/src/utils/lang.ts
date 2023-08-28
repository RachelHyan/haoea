/**
  @description 下划线转驼峰

*/
export const underscoreToCamelCase = (str: string): string => {
  return str.replace(/_([a-z])/g, (match, char) => char.toUpperCase());
}

/**
  @description 驼峰转下划线

*/
export const camelToSnake = (camel: string): string => {
  return camel.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
}