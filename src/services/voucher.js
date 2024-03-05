import { Api } from 'systems/api';

export default {
  getVoucherByOfferId: id => Api.get(`/voucher-campaign/${id}`),
  getCode: voucherCampaignId => Api.put(`/voucher-campaign/voucher?voucherCampaignId=${voucherCampaignId}`, {}, {
    headers: {
      'Content-Type': 'application/json'
    }
  }),
  voucherOwner: () => Api.get(`/voucher-campaign/own-voucher`, {params: {
      expired: false, // false con han

  }}),
}