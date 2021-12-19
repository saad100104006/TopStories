import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { from, Observable } from 'rxjs';

import { API_KEY, BACKEND_BASE } from '~/config/config';
import { getErrorMessage } from '~/api/utils';

const axiosInstance = axios.create({
  baseURL: BACKEND_BASE,
});

axiosInstance.interceptors.request.use((config) => {
  config.params = { 'api-key': API_KEY };
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Axios Response', response);
    return response;
  },
  (error) => {
    console.log('Axios error', error);

    const errorMessage = getErrorMessage(error);
    if (errorMessage === 'Network Error') {
      return Promise.reject(Error('Please check your internet connection and try again'));
    }
    return Promise.reject(error);
  },
);

const get = <T>(url: string, config?: AxiosRequestConfig): Observable<AxiosResponse<T>> => {
  return from(axiosInstance.get<T>(url, config));
};

const post = <T>(url: string, data?: any, config?: AxiosRequestConfig): Observable<AxiosResponse<T>> => {
  return from(axiosInstance.post<T>(url, data, config));
};

const put = <T>(url: string, data?: any, config?: AxiosRequestConfig): Observable<AxiosResponse<T>> => {
  return from(axiosInstance.put<T>(url, data, config));
};

const patch = <T>(url: string, data?: any, config?: AxiosRequestConfig): Observable<AxiosResponse<T>> => {
  return from(axiosInstance.patch<T>(url, data, config));
};

export default { get, post, put, patch };
