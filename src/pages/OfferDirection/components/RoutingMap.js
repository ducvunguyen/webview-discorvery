// import React, { useEffect } from 'react';
// import { useMap } from 'react-leaflet';
// import L from 'leaflet';
// import useQueryParamURL from 'hooks/useQueryParamURL';

const RoutingMap = ({positionRouting, currentPosition}) => {
  // const map = useMap();
  // const useParam = useQueryParamURL();
  // const address = useParam.get('address');
  //
  // useEffect(() => {
  //   L.Routing.control({
  //     waypoints: [
  //       L.latLng(currentPosition[0], currentPosition[1]),
  //       L.latLng(positionRouting[0], positionRouting[1]),
  //     ],
  //     routeWhileDragging: true
  //   }).addTo(map);
  //
  //   const popupAddress = content => {
  //     L.popup()
  //       .setLatLng(positionRouting)
  //       .setContent(content)
  //       .openOn(map);
  //   }
  //
  //   const onMapClick = () => {
  //     if (address && address.trim() != 'address')
  //       popupAddress(address);
  //     // else {
  //     //   const updateAddress =  setInterval(() => {
  //     //     const getAddress = document.getElementsByClassName('leaflet-routing-alt')[0]?.childNodes[0]?.textContent;
  //     //     if(getAddress) {
  //     //       clearInterval(updateAddress);
  //     //       popupAddress(getAddress);
  //     //     }
  //     //   }, 500);
  //     // }
  //   }
  //
  //   onMapClick();
  //   map.on('click', onMapClick);
  //
  // }, [currentPosition]);

  return null;
};

export default React.memo(RoutingMap);