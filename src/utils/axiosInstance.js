import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
});

axiosInstance.interceptors.request.use(
  (config) => {
    // const token =
    //   'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuZXdfY29tZXIiLCJpYXQiOjE2OTgwNzkyMDIsImV4cCI6MTY5ODE2NTYwMn0.YFYfcloYCf6DQYAQEMnum9N6wBEY0P_FAtzgV_bdPrzVAbiaY1sZjBZAXlcQ99ssY2c_BFwzRtAU1WsfdOqZMg';
    // // const token = localStorage.getItem('token');
    // const auth = token ? `Bearer ${token}` : '';
    // // config.headers.common['Authorization'] = auth;
    // config.headers.Authorization = auth;
    return config;
  },
  (error) => Promise.reject(error)
);
