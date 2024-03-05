import { Api } from 'systems/api';

export default {
  getCategories: (params, singleRequest = true) => Api.get('public/category', { singleRequest, params }),
};
