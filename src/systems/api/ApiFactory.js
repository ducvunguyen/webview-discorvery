import axios from 'axios';
import SingleRequestHandler from './SingleRequestHandler';
// import { refreshToken } from 'services/auth';
import { Auth } from 'systems/api';
import eventDispatcher from 'systems/utils/eventDispatcher';

export default class ApiFactory {
  constructor(baseUrl, auth = null) {
    this.baseUrl = baseUrl;
    this.auth = auth;
  }

  make() {
    const auth = this.auth;
    let singleRequestHandler = new SingleRequestHandler();

    const api = axios.create({
      baseURL: this.baseUrl,
    });

    api.interceptors.request.use(
      (config) => {
        config.params = config.params || {};

        if (auth && auth.getToken()) {
          config.headers = {
            ...config.headers,
            'Access-Control-Allow-Headers': 'Authorization',
            Authorization: 'Bearer ' + auth.getToken(),
          };
        }

        let cancelToken = axios.CancelToken.source();
        config.cancelToken = cancelToken.token;

        // Handle single request
        if (config.singleRequest) {
          singleRequestHandler.handle(config.method + '::' + config.url, cancelToken.cancel);
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error?.config?.method === 'post' && error?.config?.url === 'authentication/customer') {
          Auth.removeToken();
          Auth.removeRefreshToken();
          return Promise.reject(error);
        }

        if (error.response.status == 401) {
          // if (auth.getRefreshToken()) {
          //   return refreshToken(auth.getRefreshToken()).then(({ data }) => {
          //     if (data && data.token) {
          //       Auth.setToken(data.token);
          //       Auth.setRefreshToken(data.refreshToken);
          //     }
          //   });
          // }
          eventDispatcher.dispatch('SHOW_MODAL_CLOSE_APP');
          return Promise.reject(error);
        }

        if (!axios.isCancel(error)) {
          return Promise.reject(error);
        }
      }
    );

    return api;
  }
}
