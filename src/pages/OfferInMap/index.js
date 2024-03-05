import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Header, Icon } from 'components';
import api from 'services/offer';
import { openGoogleMap, useLatLng } from 'systems/utils/functionCommon';

const OfferInMap = () => {
  const latLng = useLatLng()

  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffersNearby = async (latitude, longitude) => {
      try {
        const { data } = await api.getOffersNearby({
          latitude,
          longitude,
          radius: 20,
        });
        setOffers(data);
      } catch (error) {
        console.log(error);
      }
    };

  if (latLng)
    fetchOffersNearby(latLng[0], latLng[1]);
  }, [latLng]);

  return (
    <div className="bg-white layout">
      <Header title="Chi tiết" />
      <div className="p-6">
        <div className="font-semibold">Ưu đãi gần bạn</div>
        <div>
          {offers?.map(({ categories, offer }) => (
            <div key={offer.id}>
              <div className="flex items-start py-5 border-b w-full"
                   onClick={() => openGoogleMap(latLng, [offer?.latitude, offer?.longitude])}>
                <Icon type="location" className="mr-2 mt-1 text-icon-80" />
                <div className="text-2xl">
                  <div className="font-medium">
                    {offer?.ownerName} - {offer.address}
                  </div>
                  <div className="flex items-center pt-4 text-xl w-full">
                    <div
                      className={classNames('rounded-3xl text-white font-medium px-5 py-1', {
                        'bg-A1-40': offer.distance < 5,
                        'bg-A1-50': offer.distance >= 5 && offer.distance < 10,
                        'bg-A1-30': offer.distance > 10,
                      })}
                    >
                      {Number(offer?.distance)?.toFixed(1)}km{' '}
                      {offer.timeToGo && (
                        <span>~ {Math.ceil(Number(offer.timeToGo * 60).toFixed(2))}min</span>
                      )}
                    </div>
                    <div className="ml-6 font-medium text-txt-10 ">{categories?.map(item => item.name).join(', ')}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferInMap;
