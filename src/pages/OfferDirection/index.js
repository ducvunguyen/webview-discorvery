// import { useLayoutEffect, useState } from 'react';
// import { MapContainer, TileLayer } from 'react-leaflet';
// import _ from 'lodash';
// import "leaflet-routing-machine";

// import { postMessageToApp } from 'systems/utils/helper';
// import useQueryParamURL from 'hooks/useQueryParamURL';
// import Header from 'components/Header';
// import LocationMarker from './components/LocationMarker';
// import RoutingMap from './components/RoutingMap';
// import { useLatLng } from 'systems/utils/functionCommon';

const OfferDirection = () => {
  // const latLng = useLatLng()
  //
  // const useParam = useQueryParamURL();
  // const latDirection = useParam.get('lat');
  // const lngDirection = useParam.get('lng');
  // const [position, setPosition] = useState([0.0, 0.0]);
  //
  // useLayoutEffect(() => {
  //   if (latLng)
  //     setPosition([latLng[0], latLng[1]])
  //   // const locationFromApp = postMessageToApp({ type: 'GET_LOCATION' });
  //   // if (!_.isEmpty(locationFromApp))
  //   //   setPosition([locationFromApp?.latitude, locationFromApp?.longitude]);
  //   //
  //   // else if ('geolocation' in navigator) {
  //   //   navigator.geolocation.getCurrentPosition(function(position) {
  //   //     setPosition([position.coords.latitude, position.coords.longitude]);
  //   //   });
  //   // }
  //
  // }, [latLng]);
  //
  // return <>
  //   <Header />
  //   <div className='w-full'>
  //     <MapContainer
  //       style={{ height: '90vh' }}
  //       center={position}
  //       zoom={13}
  //       scrollWheelZoom={true}>
  //       <TileLayer
  //         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  //         url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  //       />
  //       <LocationMarker position={position}/>
  //       <RoutingMap
  //         positionRouting={[latDirection, lngDirection]}
  //         currentPosition={position}
  //       />
  //     </MapContainer>
  //   </div>
  // </>

  return null;
};

export default OfferDirection;
