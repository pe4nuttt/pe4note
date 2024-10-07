export const getErrorMessage = (error: any) => {
  if (!error) return;

  if (error?.response?._data) {
    return error.response._data?.message || 'Something went wrong';
  }

  return error;
};
