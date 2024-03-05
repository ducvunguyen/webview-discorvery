import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux';
import { postMessageToApp } from './helper';
import { NATIVE_ACTION } from 'config/constants';
import api from 'services/offer';
import useLoginToken from '../../hooks/useLoginToken';
import { useEffect } from 'react';

export function makeId(length) {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

export const exportAsImage = async (element, fileName, isTakeBase64) => {
  const canvas = await html2canvas(element);
  const image = canvas.toDataURL('image/png', 1.0);
  if (isTakeBase64)
    return image;

  saveAs(image, fileName);
};

export function numberFormat(number, decimals, decPoint, thousandsSep) {
  //   example 1: number_format(1234.56)
  //   returns 1: '1,235'
  //   example 2: number_format(1234.56, 2, ',', ' ')
  //   returns 2: '1 234,56'
  //   example 3: number_format(1234.5678, 2, '.', '')
  //   returns 3: '1234.57'
  //   example 4: number_format(67, 2, ',', '.')
  //   returns 4: '67,00'
  //   example 5: number_format(1000)
  //   returns 5: '1,000'
  //   example 6: number_format(67.311, 2)
  //   returns 6: '67.31'
  //   example 7: number_format(1000.55, 1)
  //   returns 7: '1,000.6'
  //   example 8: number_format(67000, 5, ',', '.')
  //   returns 8: '67.000,00000'
  //   example 9: number_format(0.9, 0)
  //   returns 9: '1'
  //  example 10: number_format('1.20', 2)
  //  returns 10: '1.20'
  //  example 11: number_format('1.20', 4)
  //  returns 11: '1.2000'
  //  example 12: number_format('1.2000', 3)
  //  returns 12: '1.200'
  //  example 13: number_format('1 000,50', 2, '.', ' ')
  //  returns 13: '100 050.00'
  //  example 14: number_format(1e-8, 8, '.', '')
  //  returns 14: '0.00000001'
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  const n = !isFinite(+number) ? 0 : +number;
  const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
  const sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep;
  const dec = (typeof decPoint === 'undefined') ? '.' : decPoint;
  let s = '';
  const toFixedFix = function(n, prec) {
    if (('' + n).indexOf('e') === -1) {
      return +(Math.round(n + 'e+' + prec) + 'e-' + prec);
    } else {
      const arr = ('' + n).split('e');
      let sig = '';
      if (+arr[1] + prec > 0) {
        sig = '+';
      }
      return (+(Math.round(+arr[0] + 'e' + sig + (+arr[1] + prec)) + 'e-' + prec)).toFixed(prec);
    }
  };
  // @todo: for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec).toString() : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

export const handleViews = value => {
  let result = Number(value);
  if (result >= 1000 && result <= 1000000) {
    const stringResult = String(numberFormat(result / 1000, 1));
    const splitStringValue = stringResult.split('.');
    const number = Number(splitStringValue[1]) === 0 ? splitStringValue[0] : stringResult;
    result = (result / 1000 % 2 === 0 ? result / 1000 : number) + 'k';
  }

  return result;
};

export const useLatLng = () =>
  useSelector(state => state.useLocationSlice.latLng);

export const checkIssetRedirect = () =>
  useSelector(state => state.checkRedirectDetailOfferSlice.isCheck);

export const handlePostMessageToApp = (type, tel) => {
  postMessageToApp({
    type,
    data: { tel },
  });
};

export const openGoogleMap = (formLatLng, toLatLng, isLoginToken) => {
  const url = `https://www.google.com/maps/dir/${formLatLng[0]},${formLatLng[1]}/${toLatLng[0]},${toLatLng[1]}/data=!3m1!4b1!4m5!4m4!1m1!4e1!1m0!3e0?hl=vi-VN`;
  if (isLoginToken)
    return postMessageToApp({ type: NATIVE_ACTION.BROWSER, link: url });
  else
    return window.open(url, 'target', '_blank')
};

export const handleReactOffer = async ({ id, liked, index }, offers) => {
  try {
    await api.reactOffer({
      id,
      type: liked ? 'NONE' : 'LIKE',
    });

    const cloneOffers = offers;

    cloneOffers[index].liked = !liked;
    return cloneOffers;
  } catch (error) {
    return [];
  }
};