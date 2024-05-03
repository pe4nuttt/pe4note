export const useBaseFetch = () => {
  const config = useRuntimeConfig();

  const apiFetch = $fetch.create({
    baseURL: 'localhost:3000/api',
  });

  return {
    apiFetch,
  };
};
