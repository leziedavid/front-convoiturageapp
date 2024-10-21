// baseUrl.ts

// const BASE_URL_DEV = 'http://195.110.35.237:4000/api';
const BASE_URL_DEV = 'http://localhost:4000/api';
const BASE_URL_PROD = 'https://backend.covoitivoire.com/api';
export const getBaseUrl = (): string => {
    return BASE_URL_PROD;
};
