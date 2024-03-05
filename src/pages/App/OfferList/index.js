import { useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import moment from 'moment';
import _ from 'lodash';
import { Header, NoData, Loading, Icon } from 'components';
import api from 'services/offer';
import { handleViews, handleReactOffer } from 'systems/utils/functionCommon';
import useLoginToken from 'hooks/useLoginToken';

const OfferList = ({
  title,
  offers,
  loading,
  page,
  hasMore,
  fetchOffers,
  onChangeLike,
  height = 'calc(100vh - 6rem)',
}) => {
  const _scrollParentRef = useRef();
  const navigate = useNavigate();
  const {isLoginToken} = useLoginToken();

  const handleReact =
    ({ id, liked }, index) =>
      async (event) => {
        event.stopPropagation();
        handleReactOffer({id, liked, index}, offers).then(data => onChangeLike([...data]));
      };

  return (
    <div
      className={classNames('bg-white', {
        layout: title,
      })}
    >
      {title && <Header title={title} />}
      <div className="p-6 pt-3 overflow-auto" style={{ height }} ref={_scrollParentRef}>
        {loading && (
          <div className="h-full flex justify-center items-center">
            <Loading />
          </div>
        )}
        {!loading && _.isEmpty(offers) ? (
          <div className="h-full flex justify-center items-center">
            <NoData />
          </div>
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={() => fetchOffers(page + 1)}
            hasMore={hasMore && !loading}
            loader={
              <div className="my-2" key={0}>
                <Loading />
              </div>
            }
            useWindow={false}
            getScrollParent={() => _scrollParentRef.current}
            threshold={50}
          >
            {_.map(offers, (offer, index) => (
              <div className="flex border-b py-5" key={'offer'+offer + index}>
                <div
                  onClick={() => navigate(`/offers/${offer.id}`)}
                  className="bg-no-repeat bg-cover bg-slate-100 overflow-hidden w-1/3 h-32">
                  <img src={offer.thumbnailUrl} alt="offer-thumbnail" />
                </div>

                <div className="flex justify-between flex-1">
                  <div className='flex flex-col pl-4 justify-between w-9/12'
                       onClick={() => navigate(`/offers/${offer.id}`)}>
                    <div className="text-base text-txt-20 leading-4 text-1-row h-4.5">{offer.ownerName}</div>
                    <div className="text-2xl font-semibold ellipse-2-line h-16">{offer.title}</div>
                    <div className=" leading-4">
                      {
                        offer?.comingSoon ?
                      <span className="bg-white text-red-400 rounded-full pl-2 pr-2 pb-1 border border-red-400 text-base">
                        Coming soon
                      </span> :
                      <span className='text-xl text-txt-20'>
                          {moment(offer.startDate).format('DD/MM/YYYY')} -{' '}
                          {moment(offer.expiredDate).format('DD/MM/YYYY')}
                      </span>
                      }
                    </div>
                  </div>

                  <div className=' w-3/12 flex flex-col items-start justify-between pl-2'>
                    {
                      isLoginToken &&
                      <div className={classNames('rounded-full p-2.5 text-base')}
                           onClick={handleReact(offer, index)}>
                        <Icon
                          type={offer.liked ? 'favorite-fill' : 'favorite'}
                          className={classNames('text-3xl relative', {
                            'text-icon-60': offer.liked,
                          })}
                        />
                      </div >
                    }
                    <div className='flex custom-icon-eye relative top-1 left-3' >
                      <Icon type='icon-eye' />
                      <span className='text-base'>&nbsp;{handleViews(offer.view)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default OfferList;
