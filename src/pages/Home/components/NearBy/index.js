import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import _ from 'lodash';
import { Icon } from 'components';
import Skeleton from './Skeleton';
import api from 'services/offer';
import classNames from 'classnames';
import eventDispatcher from 'systems/utils/eventDispatcher';
import { EVENT } from 'config/constants';
import { useLatLng } from 'systems/utils/functionCommon';
import useLoginToken from 'hooks/useLoginToken';

const NearBy = () => {
  const navigate = useNavigate();
  const latLng = useLatLng();
  const {isLoginToken, publicUrl} = useLoginToken();

  const [loading, setLoading] = useState(true);
  const [highlightOffers, setHighlightOffers] = useState([]);

  useEffect(() => {
    const fetchHighlightOffers = async (latitude, longitude) => {
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
        setHighlightOffers([]);
      } finally {
        setLoading(false);
      }
    };

    if (latLng)
      fetchHighlightOffers(latLng[0], latLng[1]);

  }, [latLng]);

  const handleReactOffer =
    ({ id, liked }, index) =>
    async (event) => {
      event.stopPropagation();
      try {
        await api.reactOffer({
          id,
          type: liked ? 'NONE' : 'LIKE',
        });

        highlightOffers[index].liked = !liked;
        setHighlightOffers([...highlightOffers]);

        eventDispatcher.dispatch(EVENT.FETCH_FAVORITE_LIST);
        eventDispatcher.dispatch(EVENT.CHANGE_LIKE, {
          liked: !liked,
          offerId: id
        });
      } catch (error) {
        console.log(error);
      }
    };

  const handleDecodeUrl = offer => {
    return offer.addressList && offer.addressList.length > 1 ? '?openPopupAddress=ok': '';
  }

  const handleFormatForward = offer => {
    const forward = Number(offer?.distance)?.toFixed(1);
    return forward < 1 ? forward*1000 + 'm': forward + 'km';
  }

  return highlightOffers.length > 0 && (
    <div className="py-8">
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold">Ưu đãi gần bạn!</span>
        <span>
          <Link className="text-primary font-semibold text-xl" to="/offer-nearby">
            Tất cả <Icon type="chevron-right" className="text-sm" />
          </Link>
        </span>
      </div>
      <Swiper
        key={loading}
        spaceBetween={20}
        allowTouchMove={!loading}
        // loop
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          300: {
            slidesPerView: 1.3,
          },
          700: {
            slidesPerView: 2.2,
          },
        }}
        autoplay={
          !loading && {
            delay: 2000,
            disableOnInteraction: false,
          }
        }
      >
        {_.map(highlightOffers, (offer, index) => (
          <SwiperSlide
            key={offer?.id || offer}
            className="p-3 bg-white rounded-2xl text-base overflow-hidden"
          >
            <Skeleton loading={loading}>
              <div
                className="bg-no-repeat bg-cover bg-slate-100 rounded-t-lg overflow-hidden"
                style={{
                  backgroundImage: `url(${offer.hotDealUrl})`,
                  minHeight: '10.8rem',
                }}
                onClick={() => navigate(`offers/${offer.id}}`)}
              />
              {
                isLoginToken &&
                <div
                  className={classNames(
                    'rounded-full p-2.5 mt-3 mr-3 absolute top-2 right-2 flex justify-center items-center',
                    { 'bg-white': !offer.liked, 'bg-icon-60': offer.liked }
                  )}
                  onClick={handleReactOffer(offer, index)}
                >
                  <Icon
                    type="favorite-fill"
                    className={classNames('text-3xl', {
                      'text-icon-50': !offer.liked,
                      'text-white': offer.liked,
                    })}
                  />
                </div>
              }
                <div className="my-4 ellipse-2-line h-14 text-xl">{offer.title}</div>
                <div className="flex justify-between items-center text-xl">
                  <Link to={`/offers/${offer.id}${handleDecodeUrl(offer)}`}>
                  <span className="flex items-center text-icon-20 font-semibold">
                    {
                      offer.addressList && offer.addressList.length > 1 ?
                      `Xem thêm ${offer.addressList.length} chi nhánh`: `Xem chi tiết`
                    }
                    <Icon type="chevron-right-circle" className="pl-3" />
                  </span>
                  </Link>

                  {/*{renderRemainTimes(offer)}*/}
                  <div
                    className={classNames('rounded-3xl text-white font-medium px-5 py-1', {
                      'bg-A1-40': offer.distance < 5,
                      'bg-A1-50': offer.distance >= 5 && offer.distance < 10,
                      'bg-A1-30': offer.distance > 10,
                    })}
                  >
                    {handleFormatForward(offer)}
                  </div>
                </div>
            </Skeleton>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NearBy;
