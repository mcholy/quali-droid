import axios from 'axios';

const axiosWithHeaders = axios.create();
axiosWithHeaders.interceptors.request.use(
  function (config) {
    //const token = getAccessToken();
    const token = '';
    if (token) {
      config.headers.Authorization = `bearer ${token}`;
      config.headers.Accept = 'application/json';
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosWithHeaders;
