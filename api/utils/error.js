export const errorHandler = (statusCode, message) => {
  console.log(message);
  console.log(statusCode);
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
