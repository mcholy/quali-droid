import axios from 'axios';

const axiosWithHeaders = axios.create();
axiosWithHeaders.interceptors.request.use(
  async function (config) {
    let accessToken = null;
    const authStorageJSON = await localStorage.getItem('auth-storage');
    if (authStorageJSON) {
      const authStorage = JSON.parse(authStorageJSON);
      const state = authStorage.state;
      if (state) {
        accessToken = state.accessToken;
        config.headers.Authorization = `bearer ${accessToken}`;
        config.headers.Accept = 'application/json';
        config.headers['Content-Type'] = 'application/json';
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosWithHeaders;
