import axios from 'axios';

import Config from '@/config';

const request = axios.create({
  baseURL: Config.baseURL,
});

// 请求拦截器
request.interceptors.request.use(
  async function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// 响应拦截器
request.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export { request };
