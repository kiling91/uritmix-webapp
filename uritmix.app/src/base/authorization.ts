import axios from 'axios';
import { IAccount } from './account';
import { Api } from "uritmix.api"

const maxRequestCounter = 3

export const createAuthAxiosUse = () => {
  axios.interceptors.request.use((config: any) => {
    const account = IAccount.load();
    if (account)
      config.headers.Authorization = `Bearer ${account?.accessToken}`;
  
    if (!config.headers['request-counter'])
      config.headers['request-counter'] = 0;
    config.headers['request-counter'] += 1;
    return config;
  });
}

const loginUserService = async (error: any) => {
  const account = IAccount.load();
  if (!account) {
    IAccount.logout();
    return Promise.reject(error);
  }

  const rememberMe = IAccount.accountStorageIsLocalStorage();
  IAccount.logout();

  try {
    const res = await Api.authApi.apiV1AuthRefreshPost({
      token: account.refreshToken
    });

    if (!res.data.ok || !res.data.result) {
      IAccount.logout();
      window.location.reload();
      return Promise.reject(error);
    }

    const refreshAccount = IAccount.mapping(res.data.result);
    IAccount.save(refreshAccount, rememberMe);
    createAxiosResponseInterceptor();

    return axios(error.response.config);
  } catch (e) {
    IAccount.logout();
    window.location.reload();
    return Promise.reject(error);
  }
};

export const createAxiosResponseInterceptor = () => {
  const interceptor = axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response.status !== 401)
        return Promise.reject(error);
      const requestCounter = error.response.config.headers['request-counter'] || 100;
      if (requestCounter >= maxRequestCounter)
        return Promise.reject(error);
      axios.interceptors.response.eject(interceptor);
      return loginUserService(error);
    }
  );
};