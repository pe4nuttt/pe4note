export const useBaseFetch = () => {
  const config = useRuntimeConfig();

  const apiFetch = $fetch.create({
    baseURL: 'http://localhost:3000/api',
  });

  return {
    apiFetch,
    provide: {
      apiFetch,
    },
  };
};
