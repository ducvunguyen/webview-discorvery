import lodash from 'lodash';

export const getEnv = (params, defaultValue) => lodash.get(process.env, params, defaultValue);

export const formatMoney = (money) => Number(money).toLocaleString().replaceAll(',', '.');

export const postMessageToApp = (data) => {
  return window['ReactNativeWebView']
    ? window['ReactNativeWebView'].postMessage(JSON.stringify(data))
    : null;
}; 