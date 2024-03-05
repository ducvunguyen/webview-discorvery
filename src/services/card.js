import { Api } from 'systems/api';

export const getCards = (params) => Api.get('/card', { singleRequest: true, params });