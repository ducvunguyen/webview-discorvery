import { useEffect, useState } from 'react';
import { Autoplay } from 'swiper';
import moment from 'moment';
import { map } from 'lodash';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import api from 'services/offer';
import Skeleton from '../../Home/components/HotDeal/Skeleton';
import useLoginToken from 'hooks/useLoginToken';

const Recommend = ({ id }) => {
  const {publicUrl} = useLoginToken();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
      api
        .offerRecommend(id, publicUrl)
        .then(({ data }) => {
          setOffers(data);
        })
        .finally(() => setLoading(false));
  }, []);

  if (offers.length === 0) return null;

  return (
    <>
      <div className="pb-4 text-2xl font-semibold">Có thể bạn quan tâm</div>
      <Swiper
        key={loading}
        spaceBetween={5}
        allowTouchMove={!loading}
        // loop
        breakpoints={{
          0: {
            slidesPerView: 2.3,
          },
          300: {
            slidesPerView: 2.3,
          },
          700: {
            slidesPerView: 2.3,
          },
        }}
        autoplay={
          !loading && {
            delay: 2000,
            disableOnInteraction: false,
          }
        }
      >
        {map(offers, (offer, index) => (
          <SwiperSlide
            key={offer?.id || offer}
            className="overflow-hidden text-base bg-white rounded-2xl"
          >
            <Link to={`/offers/${offer.id}`}>
              <Skeleton loading={loading}>
                <div
                  className="overflow-hidden bg-no-repeat bg-cover rounded-t-lg bg-slate-100"
                  style={{
                    backgroundImage: `url(${offer.hotDealUrl || offer.thumbnailUrl})`,
                    minHeight: '10.8rem',
                  }}
                  // onClick={() => navigate(`offers/${offer.id}`)}
                />
                <div
                  className="absolute bg-white bg-no-repeat bg-contain rounded-full h-9 w-9"
                  style={{ backgroundImage: `url(${offer.logoUrl})`, top: '98px', left: '7px' }}
                />
                <div className="p-3 mt-3">
                  <div className="text-txt-20 ellipse-2-line">{offer.ownerName}</div>
                  <div className="my-4 text-xl h-14 ellipse-2-line ">{offer.title}</div>
                  <div className="my-4 text-txt-20 ">
                    {moment(offer.startDate).format('DD/MM/YYYY')} -
                    {moment(offer.expiredDate).format('DD/MM/YYYY')}
                  </div>
                </div>
              </Skeleton>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Recommend;
