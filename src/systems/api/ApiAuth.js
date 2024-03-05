import { LOCAL_STORAGE_KEY } from 'config/constants';

export default class LocalStorageApiAuth {
  constructor(storageKey = LOCAL_STORAGE_KEY.AUTH_TOKEN) {
    this.storageKey = storageKey;
    this.refreshToken = LOCAL_STORAGE_KEY.REFRESH_TOKEN;
  }

  getToken() {
    return localStorage.getItem(this.storageKey);
  }

  setToken(token) {
    localStorage.setItem(this.storageKey, token);
  }

  removeToken() {
    localStorage.removeItem(this.storageKey);
  }

  setRefreshToken(refreshToken) {
    localStorage.setItem(this.refreshToken, refreshToken);
  }

  getRefreshToken() {
    return localStorage.getItem(this.refreshToken);
  }

  removeRefreshToken() {
    localStorage.removeItem(this.refreshToken);
  }
}
