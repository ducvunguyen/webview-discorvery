import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Icon } from 'components';
import Skeleton from './Skeleton';
import { EVENT } from 'config/constants';
import api from 'services/offer';
import eventDispatcher from 'systems/utils/eventDispatcher';
import useLoginToken from 'hooks/useLoginToken';

const OfferByCategory = ({ categories, positionCategory }) => {
  const navigate = useNavigate();
  const {publicUrl, isLoginToken} = useLoginToken();

  // const categories = useCategory();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState({});
  const [offers, setOffers] = useState([1, 2, 3]);

  useEffect(() => {
    const getOffers = async (categoryId) => {
      try {
        setLoading(true);
        const { data } = await api.getOffersByCategory({
          page: 0,
          pageSize: 10,
          categoryId,
          expired: false,
        }, publicUrl);

        setOffers(data.offers);
        eventDispatcher.listen(EVENT.CHANGE_LIKE, (event, payload) => {
          data?.offers.forEach(item => {
            if (item.id === payload.offerId){
              item.liked = payload.liked;
            }
          });

          setOffers([...data.offers]);
        });
      } catch (error) {
        console.log(error);
        setOffers([]);
      } finally {
        setLoading(false);
      }
    };

    if (categories?.length !== 0) {
      getOffers(categories[positionCategory].id);
      setCategory(categories[positionCategory]);
    }
  }, [categories, isLoginToken]);

  const handleReactOffer =
    ({ id, liked }, index) =>
    async (event) => {
      event.stopPropagation();
      try {
        await api.reactOffer({
          id,
          type: liked ? 'NONE' : 'LIKE',
        });

        offers[index].liked = !liked;
        setOffers([...offers]);

        eventDispatcher.dispatch(EVENT.FETCH_FAVORITE_LIST);
        eventDispatcher.dispatch(EVENT.CHANGE_LIKE, {
          liked: !liked,
          offerId: id
        });
        console.log(1111);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <>
      {
        offers.length > 0 &&
        <div className="py-8">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold">{category.name}</span>
            <span>
          <Link
            className="text-primary font-semibold text-xl"
            to={`/categories/${category.id}/offers`}
          >
            Xem thêm <Icon type="chevron-right" className="text-sm" />
          </Link>
        </span>
          </div>
          <Swiper
            key={loading}
            spaceBetween={18}
            allowTouchMove={!loading}
            loop={offers.length > 2 ?? false}
            breakpoints={{
              0: {
                slidesPerView: 1.5,
              },
              300: {
                slidesPerView: 2,
              },
              700: {
                slidesPerView: 3.5,
              },
            }}
          >
            {offers.map((offer, index) => (
              <SwiperSlide
                key={offer?.id || offer}
                className="rounded-lg overflow-hidden"
                style={{
                  boxShadow: '0px 4px 4px rgba(216, 216, 216, 0.25)',
                }}
              >
                <Skeleton loading={loading}>
                  <div
                    className="bg-no-repeat bg-cover bg-slate-100 relative"
                    style={{
                      backgroundImage: `url(${offer?.thumbnailUrl})`,
                      height: '13rem',
                    }}
                    onClick={() => navigate(`offers/${offer.id}`)}
                  >
                    {offer.highlight && (
                      <>
                        <div
                          className={classNames(
                            'rounded-full bg-A1-10 w-24 h-24 absolute -top-7 -left-6'
                          )}
                        />
                        <div className="absolute top-4 left-3 text-white text-xl font-light">HOT</div>
                      </>
                    )}
                    {
                      isLoginToken &&
                      <div
                        className={classNames(
                          'rounded-full p-2.5 absolute top-2 right-2 flex justify-center items-center',
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

                  </div>
                  <div className="px-4 py-3 bg-white"
                       onClick={() => navigate(`offers/${offer.id}`)}>
                    <div className="text-2xl font-semibold pb-3 ellipse-2-line h-16 mt-1 mb-3">
                      {offer.title}
                    </div>
                    {/*<div className='text-xl '>*/}
                    {/*  <span>Lượt xem: {offer.view} </span>*/}
                    {/*</div>*/}
                    {/*<div className="text-xl text-txt-10 text-1-row">{offer.ownerName}</div>*/}
                  </div>
                </Skeleton>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      }
    </>
  );
};

export default OfferByCategory;
