export const capitalize = (string: string): string => {
  return `${string.slice(0, 1).toUpperCase()}${string.slice(1)}`;
};

export const ensure = <T>(argument: T | undefined | null, message: string = 'This value was promised to be there.'): T => {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
};
