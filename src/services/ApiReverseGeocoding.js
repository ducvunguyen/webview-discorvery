export default {
  getLocationNameCity: ({latitude, longitude}) =>
    fetch(`${urlReverseGeocoding}?latitude=${latitude}&longitude=${longitude}${configReverseGeocoding}`)
    .then(res => res.json()),
};

const SECRET_KEY = 'bdc_7be612a9d42c4172b109c5146ef9e43e';
const urlReverseGeocoding = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

const config = {
  localityLanguage : 'vi',
  key : SECRET_KEY
}
let configReverseGeocoding  = '';
Object.keys(config).map(key => configReverseGeocoding += config[key] ? '&' + key + '=' + config[key] : '');