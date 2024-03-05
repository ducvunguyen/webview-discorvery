import { Api } from 'systems/api';

export default {
  getFavoriteOffers: (params) => Api.get('/offer/favorite', { params }),
  getHighlightOffers: (params, publicUrl = '') => Api.get(publicUrl+'/offer/highlight', { params }),
  getOffersByCategory: (params, publicUrl = '') => Api.get(publicUrl+'/offer/category', { params }),
  getOffer: (id, publicUrl = '') => Api.get(publicUrl+`/offer/${id}`, { singleRequest: true }),
  getMapKey: (params) => Api.get('/offer/map-key', { params }),
  searchOffers: (data, publicUrl= '') => Api.post(publicUrl+'/offer/search', data),
  getOffersNearby: (data, publicUrl = '') => Api.post(publicUrl+'/offer/nearby', data),
  getOfferAddress: (data) => Api.post('/offer/address', data),
  reactOffer: (data) => Api.post('/offer/react', data),
  recentlyView: ({page, size}) => Api.get('/offer/recently-view', {params: {page, size}}),
  offerAll: (publicUrl = '') => Api.post(publicUrl+'/offer/all', {}),
  offerKVSearch: (publicUrl = '') => Api.post(publicUrl+'/offer/gallery-search', {}),
  offerKVPopup: () => Api.post('/offer/gallery-popup', {}),
  listKVOfferSearch: ({page, size, sort}, publicUrl = '') =>
    Api.post(publicUrl+`/offer/gallery-offer-search?page=${page}&size=${size}&sort=${sort}`,{}),
  listKVOfferPopup: ({page, size, sort, galleryId}) =>
    Api.post(`/offer/gallery-offer-popup?page=${page}&size=${size}&sort=${sort}&galleryId=${galleryId}`,{}),
  getDistrict: ({districtType, parentCode }) => Api.get(`/district`,{params: {districtType, parentCode}}),
  getDocument: () => Api.get(`/offer/document`),
  offerRecommend: (id, publicUrl = '') => Api.get(publicUrl+`/offer/recommend/${id}`),
};
