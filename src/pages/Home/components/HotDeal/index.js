import { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import classNames from 'classnames';
import { map } from 'lodash';
import { Icon } from 'components';

import RenderRemainTime from 'components/RemainTime';
import Skeleton from './Skeleton';

import api from 'services/offer';
import eventDispatcher from 'systems/utils/eventDispatcher';
import { EVENT } from 'config/constants';
import useLoginToken from 'hooks/useLoginToken';

const HotDeal = () => {
  const navigate = useNavigate();
  const {isLoginToken, publicUrl} = useLoginToken();

  const [loading, setLoading] = useState(true);
  const [highlightOffers, setHighlightOffers] = useState([0, 1]);
  const [activeFilterOwner, setActiveFilterOwner] = useState(null);

  useEffect(() => {
    const fetchHighlightOffers = async () => {
      setLoading(true);
      try {
        const params = {
          page: 0,
          pageSize: 10,
          index: true
        };

        const { data } = await api.getHighlightOffers(params, publicUrl);
        setHighlightOffers(data.offers);
        eventDispatcher.listen(EVENT.CHANGE_LIKE, (event, payload) => {
          data.offers.forEach(item => {
            if (item.id === payload.offerId){
              item.liked = payload.liked;
            }
          });

          setHighlightOffers([...data.offers]);
        });
      } catch (error) {
        console.log(error);
        setHighlightOffers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHighlightOffers();

  }, []);

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

  const handleFilterOwnerName = offer => {
    setActiveFilterOwner({...offer});
  }

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-4">
        <span className="font-bold">Hot deal!</span>
        <span>
          <Link className="text-xl font-semibold text-primary" to="/hot-deal">
            Tất cả <Icon type="chevron-right" className="text-sm" />
          </Link>
        </span>
      </div>
      {/*List offer*/}
      <Swiper
        key={loading}
        spaceBetween={20}
        allowTouchMove={!loading}
        loop
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
        modules={[Autoplay]}
      >
        {
          map(highlightOffers, (offer, index) => (
          <SwiperSlide
            key={offer?.id || offer}
            className="p-3 overflow-hidden text-base bg-white rounded-2xl"
          >
            <Skeleton loading={loading}>
              <div
                className="overflow-hidden bg-no-repeat bg-cover rounded-t-lg bg-slate-100"
                style={{
                  backgroundImage: `url(${offer?.hotDealUrl || offer?.thumbnailUrl})`,
                  minHeight: '10.8rem',
                }}
                onClick={() => navigate(`offers/${offer.id}`)}
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

              <Link to={`/offers/${offer.id}`}>
                <div className="my-4 text-xl ellipse-2-line h-14 ">{offer.title}</div>
                {/*<div className='text-xl '>*/}
                {/*  <span>Lượt xem: {offer.view} </span>*/}
                {/*</div>*/}
                <div className="flex items-center justify-between text-xl">
                  <span className="flex items-center font-semibold text-icon-20">
                    Xem chi tiết <Icon type="chevron-right-circle" className="pl-3" />
                  </span>
                  <RenderRemainTime offer={offer}  />
                </div>
              </Link>
            </Skeleton>
          </SwiperSlide>
        ))}
      </Swiper>
      {/*List offer*/}
    </div>
  );
};

export default HotDeal;
