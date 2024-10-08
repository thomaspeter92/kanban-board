// for mocking async calls
export const timeout = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
