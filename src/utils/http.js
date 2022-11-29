import axios from 'axios';
import _ from 'lodash';
import {getToken, setToken} from './index';
import AuthService from '../services/AuthService';
import {API_BASE_URL} from '../config';
const axiosInstance = axios.create();

// request interceptor
axiosInstance.interceptors.request.use(async req => {
  let authTokens = await getToken();
  req.headers['Content-Type'] = `application/json`;
  req.headers.Accept = `application/json`;
  if (authTokens) {
    req.headers.Authorization = `Bearer ${authTokens?.access}`;
  }
  return req;
});

axiosInstance.interceptors.response.use(async response => {
  console.log('responseresponse::', response);
  return response;
});

export default axiosInstance;
