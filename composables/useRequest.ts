export const useBaseFetch = () => {
  const config = useRuntimeConfig();

  const apiFetch = $fetch.create({
    baseURL: 'http://localhost:3000/api',
    onResponseError({ response }) {
      console.debug('[FETCH ERROR]', response);
    },
  });

  return {
    apiFetch,
    provide: {
      apiFetch,
    },
  };
};
