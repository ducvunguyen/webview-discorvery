import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Badge, Header, Icon } from 'components';
import api from 'services/offer';
import { NATIVE_ACTION, EVENT } from 'config/constants';
import { postMessageToApp } from 'systems/utils/helper';
import eventDispatcher from 'systems/utils/eventDispatcher';
import useUserLocation from 'hooks/useUserLocation';
import useLoginToken from 'hooks/useLoginToken';

const HomeHeader = () => {
  const userLocation = useUserLocation();
  const {isLoginToken} = useLoginToken();


  const [totalFavorite, setTotalFavorite] = useState();
  const [documentUrl, setDocumentUrl] = useState(null);

  const handleCloseApp = () => postMessageToApp({ type: NATIVE_ACTION.CLOSE_APP });

  useEffect(() => {
    if (isLoginToken){
      const fetchFavoriteOffers = async () => {
        try {
          const { data } = await api.getFavoriteOffers({
            page: 0,
            pageSize: 100,
            expired: false,
          });
          setTotalFavorite(data.totalSize);
        } catch (error) {
          console.log(error);
        }
      };
      fetchFavoriteOffers();

      api.getDocument().then(({data}) => {
        if (typeof data != 'string')
          setDocumentUrl(data.documentUrl);
      });

      return eventDispatcher.listen(EVENT.FETCH_FAVORITE_LIST, (event, payload) => {
        fetchFavoriteOffers();
      });
    }

  }, [isLoginToken]);

  const handleOpenDocument = () =>
    postMessageToApp({ type: NATIVE_ACTION.BROWSER, link: `http://docs.google.com/gview?url=${documentUrl}&embedded=true` });

  return (
    <Header
      goBack={handleCloseApp}
      title={
        <div className="flex justify-between items-center w-full pl-16 pr-6">
          <Link to="/offers-in-map">
            <div className="text-base">Địa điểm áp dụng</div>
            <div className="flex items-center text-2xl">
              <Icon type="location" className="text-icon-60 mr-2 mt-1" /> {userLocation}
            </div>
          </Link>
          <div className="text-primary flex">
            {
              documentUrl &&
              <>
                <div
                  onClick={handleOpenDocument}
                  className="flex justify-center items-center bg-white rounded-full w-14 h-14 text-3xl"
                >
                  {/*<Icon type="discount" />*/}
                  <Icon type="icon-document" />
                </div> &nbsp; &nbsp;
              </>
            }
            {
              isLoginToken &&
              <Badge amount={totalFavorite} position="bottom-right">
                <Link
                  className="flex justify-center items-center bg-white rounded-full w-14 h-14 text-3xl"
                  to="/favorite-offers"
                >
                  {/*<Icon type="discount" />*/}
                  <Icon type="icon-favorite-offer" />
                </Link>
              </Badge>
            }
          </div>
        </div>
      }
    />
  );
};

export default HomeHeader;
