import { useRef, useEffect, useState } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import useQueryParamURL from 'hooks/useQueryParamURL';
import api from 'services/offer';

import Header from './components/Header';
import { Banner } from '../OfferDetail/components';
import ViewImageBanner from 'components/ViewImageBanner';
import Tab from './components/Tab';
import { Icon, Loading, NoData } from 'components';
import { handleReactOffer, handleViews } from 'systems/utils/functionCommon';
import useLoginToken from 'hooks/useLoginToken';

const OfferKV = () => {
  const navigate = useNavigate();

  const {publicUrl} = useLoginToken();
  const galleryId = useQueryParamURL().get('galleryId');

  const _layoutRef = useRef();
  const _headerContainerRef = useRef();

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offerKv, setOfferKV] = useState(null);
  const [headerContainerPosition, setHeaderContainerPosition] = useState(0);
  const [isOpenViewBanner, setIsOpenViewBanner] = useState(false);
  const [activeTab, setActiveTab] = useState('updatedDate,desc');

  useEffect(() => {
    loadDataItems(0);
  }, [activeTab]);

  const loadDataItems = (currentPage) => {
    setLoading(true);
    const params = {
      page: currentPage,
      size: 9999,
      sort: activeTab
    }

    if (galleryId)
      params.galleryId = galleryId;

    const getApi = galleryId ? api.listKVOfferPopup(params) : api.listKVOfferSearch(params, publicUrl);

    getApi.then(({ data }) => {
      const { totalPage, gallery } = data;
      setOffers([...offers, ...data?.offers]);
      setOfferKV(gallery);
    }).finally(() => setLoading(false));
  };

  const handleScroll = () => {
    const scrollPosition = _headerContainerRef?.current?.getBoundingClientRect()?.top;
    if (scrollPosition > -85)
      setHeaderContainerPosition(scrollPosition);

    // scroll very fast
    if (scrollPosition <= -85 && headerContainerPosition >= -85) {
      setHeaderContainerPosition(-85);
    }
  };

  const handleReact =
    ({ id, liked }, index) =>
      async (event) => {
        event.stopPropagation();
        handleReactOffer({id, liked, index}, offers).then(data => setOffers([...data]));
      };

  const onChangeTab = tab => {
    setOffers([]);
    setActiveTab(tab);
  }
  return (
    <div
      ref={_layoutRef}
      className='bg-background layout flex flex-col justify-between'
      style={{ height: '100vh' }}
      onScroll={handleScroll}
    >
      <div className='w-full' ref={_headerContainerRef}>
        <div className='w-full ' >
          <Header
            title={offerKv?.name}
            headerContainerPosition={headerContainerPosition}
          />
          <Banner bannerUrl={offerKv?.thumbnailUrl}
                  openViewBanner={() => setIsOpenViewBanner(true)} />
          <div className='font-semibold text-3xl py-4 mx-4' >
            {offerKv?.name}
          </div>
          <div className='border-b'></div>
          <div className='mt-2 mb-2'>
            <Tab nameTabs={tabs}
                 active={activeTab}
                 onChange={onChangeTab}/>
          </div>
        </div>
        <div className="p-6 pt-3"  >
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
            <>
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
                      <div className={classNames('rounded-full p-2.5 text-base')}
                           onClick={handleReact(offer, index)}>
                        <Icon
                          type={offer.liked ? 'favorite-fill' : 'favorite'}
                          className={classNames('text-3xl relative', {
                            'text-icon-60': offer.liked,
                          })}
                        />
                      </div >
                      <div className='flex custom-icon-eye relative top-1 left-3' >
                        <Icon type='icon-eye' />
                        <span className='text-base'>&nbsp;{handleViews(offer.view)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <ViewImageBanner isOpen={isOpenViewBanner}
                       onClose={() => setIsOpenViewBanner(false)}
                       image={offerKv?.thumbnailUrl} />
    </div>
  );
};
export default OfferKV;

const tabs = [
  {
    name: 'Ưu đãi mới nhất',
    key: 'updatedDate,desc'
  },
  {
    name: 'Ưu đãi nhiều lượt xem',
    key: 'view,desc'
  }
]