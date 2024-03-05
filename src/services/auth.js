import { Api } from 'systems/api';

export const login = (token) => Api.post('authentication/customer', { token });

export const refreshToken = (token) => Api.get(`authentication/customer?token=${token}`);
