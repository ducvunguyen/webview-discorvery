import { useState } from 'react';

import api from 'services/offer';
import eventDispatcher from 'systems/utils/eventDispatcher';
import { EVENT } from 'config/constants';
import { useLatLng } from 'systems/utils/functionCommon';
import NearByList from '../App/NearByList';
import useLoginToken from 'hooks/useLoginToken';

const NearBy = () => {
  const latLng = useLatLng();
  const {publicUrl} = useLoginToken();

  const [loading, setLoading] = useState(true);
  const [highlightOffers, setHighlightOffers] = useState([]);

  const fetchHighlightOffers = async () => {
    const fetchData = async (latitude, longitude) => {
      setLoading(true);
      try {
        const { data } = await api.getOffersNearby({
          latitude,
          longitude,
          radius: 20
        }, publicUrl);
        const dataSource = data.map(item => item.offer);
        setHighlightOffers(dataSource);
        eventDispatcher.listen(EVENT.CHANGE_LIKE, (event, payload) => {
          dataSource.forEach(item => {
            if (item.id === payload.offerId){
              item.liked = payload.liked;
            }
          });

          setHighlightOffers([...dataSource]);
        });
      } catch (error) {
        console.log(error);
        setHighlightOffers([]);
      } finally {
        setLoading(false);
      }
    };

    if (latLng)
      fetchData(latLng[0], latLng[1]);
  };

  return (
   <NearByList
     loading={loading}
     dataSource={highlightOffers}
     loadDataItems={fetchHighlightOffers}
   />
  );
};

export default NearBy;
