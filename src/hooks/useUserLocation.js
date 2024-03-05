import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash';
import api from 'services/ApiReverseGeocoding';
import { postMessageToApp } from 'systems/utils/helper';
import { updateCity, updateLatLng } from '../redux/slices/userLocationSlice';

const useUserLocation = () => {
  const nameCity = useSelector(state => state.useLocationSlice.nameCity)
  const dispatch = useDispatch()

  const [location, setLocation] = useState(nameCity || '');

  useEffect(() => {
    if (!nameCity) {
      const fetchUserLocation = async (latitude, longitude) => {
        try {

          const data  = await api.getLocationNameCity({
            latitude,
            longitude,
          });
          const locationName = `${data.locality}, ${data.city}`
          setLocation(locationName);
          dispatch(updateCity(locationName));

          // localStorage.setItem(LOCAL_STORAGE_KEY.USER_LOCATION, JSON.stringify(data));
        } catch (error) {
          console.log(error);
        }
      };
      const locationFromApp = postMessageToApp({ type: 'GET_LOCATION' });
      if (!_.isEmpty(locationFromApp)) {
        fetchUserLocation(locationFromApp?.latitude, locationFromApp?.longitude);
        dispatch(updateLatLng([position.coords.latitude, position.coords.longitude]))
      } else if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          fetchUserLocation(position.coords.latitude, position.coords.longitude);
          dispatch(updateLatLng([position.coords.latitude, position.coords.longitude]))
        }, error => {

        });
      }
    }
  }, []);

  return location;
};

export default useUserLocation;
