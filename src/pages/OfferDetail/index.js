import { useState, useEffect, useMemo, useRef } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';

// import { CopyToClipboard } from 'react-copy-to-clipboard';
import classNames from 'classnames';
import { postMessageToApp } from 'systems/utils/helper';

import useQueryParamURL from "hooks/useQueryParamURL";
import PopupSuccess from '../App/PopupSuccess';

import api from 'services/offer';
import { NATIVE_ACTION } from 'config/constants';
import { Icon, Loading } from 'components';
import { Header, Banner, LogoBrand, Description } from './components';

import ViewImageBanner from 'components/ViewImageBanner';
import ListAddressStore from './components/ListAddressStore';
import Voucher from './components/Voucher';
import RenderRemainTime from 'components/RemainTime';
import Recommend from './components/Recommend';
import useLoginToken from 'hooks/useLoginToken';

const OfferDetail = () => {
  const queryParams = useQueryParamURL();
  const { id: offerId } = useParams();
  const {publicUrl, isLoginToken} = useLoginToken();
  const openPopupAddress = queryParams.get('openPopupAddress') ? true : false;

  const [loading, setLoading] = useState(true);
  const [offer, setOffer] = useState({});
  const [headerContainerPosition, setHeaderContainerPosition] = useState(0);
  const [loadingPopup, setLoadingPopup] = useState(false);
  const [message, setMessage] = useState(null);
  const [isOpenViewBanner, setIsOpenViewBanner] = useState(false);
  const [isOpenPopupListStore, setIsOpenPopupListStore] = useState(openPopupAddress);
  const [tab, setTab] = useState('tab-detail');

  const _headerContainerRef = useRef();
  const _footerRef = useRef();
  const _layoutRef = useRef();

  const expiredOffer = useMemo(() =>
    moment(offer.expiredDate).isBefore() < 0, [offer.expiredDate]);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const { data } = await api.getOffer(offerId, publicUrl);
        data.conditionHtml = '';
        data?.conditions?.map(condition => data.conditionHtml += `<div>${condition}</div>`);
        if(data.conditionHtml == '')
          data.conditionHtml = 'Chưa có điều kiện';

        setOffer(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffer();
  }, [isLoginToken]);

  useEffect(() => {
    if (_footerRef.current && openPopupAddress)
      _footerRef.current?.scrollIntoView();
  }, [offer]);

  const handleScroll = () => {
    const scrollPosition = _headerContainerRef?.current?.getBoundingClientRect()?.top;
    if (scrollPosition > -85) {
      setHeaderContainerPosition(scrollPosition);
    }

    // scroll very fast
    if (scrollPosition <= -85 && headerContainerPosition >= -85) {
      setHeaderContainerPosition(-85);
    }
  };

  const handleRedirectToWebAddressStore = () =>{
    if (isLoginToken)
      return postMessageToApp({ type: NATIVE_ACTION.BROWSER, link: offer.linkWeb });

    window.open(offer.linkWeb, 'target', '_blank')
  }

  const handleOpenListAddress = () =>
    setIsOpenPopupListStore(!isOpenPopupListStore);

  const handleChangeTab = nameTab => event => {
    event.preventDefault();
    setTab(nameTab)
  }

  if (loading) return <Loading fullScreen />;

  return (
    <>
      <div
        ref={_layoutRef}
        className="flex flex-col justify-between bg-background layout"
        style={{height: '100vh'}}
        onScroll={handleScroll}
      >
        <div className='w-full'>
          <div className="relative " ref={_headerContainerRef}>
            <Header
              offer={offer}
              setOffer={setOffer}
              headerContainerPosition={headerContainerPosition}
            />
            <Banner bannerUrl={offer.bannerUrl} openViewBanner={() => setIsOpenViewBanner(true)}/>
            <LogoBrand logoUrl={offer.logoUrl} />
            {/*<div className="py-4 mx-6 text-3xl font-semibold border-b-2 border-dashed mt-14">{offer?.title}</div>*/}
            <div className="py-4 mx-6 text-2xl font-semibold mt-14 ">{offer?.title}</div>
            <div className="px-6 text-2xl font-normal ">
              {expiredOffer ? (
                'Đã hết hạn'
              ) : (
                <div className="pb-3 text-xl border-b border-dashed">
                  <div className="flex justify-between ">
                    <div className="text-xl font-normal flex items-center">
                       <span >
                         Hiệu lực:&nbsp;
                        {moment(offer.startDate).format('DD/MM/YYYY')}
                        </span>&nbsp;-&nbsp;<span className="pl-1 ">
                          {moment(offer.expiredDate).format('DD/MM/YYYY')}
                        </span>
                    </div>
                    {
                      offer?.comingSoon ?
                        <span className="pb-1 pl-2 pr-2 text-base text-red-400 bg-white border border-red-400 rounded-full">
                        Coming soon
                      </span>: <RenderRemainTime offer={offer}  />
                    }
                  </div>
                </div>
              )}
            </div>
            {
              (offer && isLoginToken) &&
              <div className="py-1 mx-6 text-txt-30">
                <Voucher offer={offer} />
              </div>
            }

          </div>

          <div className="mx-6 text-txt-30">
            {/*<CountTime expiredDate={offer?.expiredDate} startDate={offer?.startDate} />*/}

            <div className="flex items-center justify-center py-4">
              <div
                style={{background: tab === 'tab-detail' && '#52DDDD'}}
                onClick={handleChangeTab('tab-detail')}
                className={classNames('w-6/12 text-xl flex justify-center items-center p-2', {
                  'text-slate-500 font-normal': !(tab === 'tab-detail'),
                  'border rounded-full text-current font-semibold' : tab === 'tab-detail'
                })}>
                Chi tiết ưu đãi
              </div>
              <div
                onClick={handleChangeTab('tab-guides')}
                style={{background: tab === 'tab-guides' && '#52DDDD'}}
                className={classNames('w-6/12 text-xl flex justify-center items-center p-2', {
                  'text-slate-500 font-normal': !(tab === 'tab-guides'),
                  'border rounded-full text-current font-semibold' : tab === 'tab-guides'
              })}>
                Hướng dẫn sử dụng
              </div>
            </div>

            {
              (offer.useMethod || offer.description) &&
              <div className="mb-8 bg-white">
                <Description description={tab === 'tab-detail' ? offer?.description : offer?.useMethod} />
              </div>
            }
            
            {
              offer?.conditions &&
              <div className="mt-4 mb-8">
                <Description title='Điều kiện áp dụng' description={offer?.conditionHtml} />
              </div>
            }

            <div className="mb-8">
              <Recommend id={offerId} />
            </div>
          </div>
        </div>
        {
          (offer.linkWeb || ( offer.addressList && offer.addressList.length > 0 )) &&
          <div className="flex items-center justify-center p-6 bg-white">
            {
              offer.linkWeb &&
              <button
                onClick={handleRedirectToWebAddressStore}
                className={classNames('flex justify-center items-center text-xl h-full bg-transparent bg-white text-blue-700 font-semibold py-4 px-4 border border-blue-500 rounded', {
                  'w-full': !offer.addressList,
                  'w-6/12': offer.addressList
                })}>
                <Icon type="icon-shape" className="w-8 mr-3" />
                <span>Website</span>
              </button>
            }
            {
              (offer.addressList && offer.addressList.length > 0) &&
              <button
                onClick={handleOpenListAddress}
                className={classNames('flex items-center justify-center bg-blue-500 hover:bg-blue-700 h-full text-xl font-semibold text-white py-4 px-4 rounded', {
                  'ml-5 w-6/12': offer?.linkWeb,
                  'w-full': !offer?.linkWeb
                })}>
                <Icon type="icon-store-solid" className="w-8 h-8 mr-3" />
                <span>Cửa hàng</span>
              </button>
            }
          </div>
        }
      </div>
      <ViewImageBanner image={offer?.bannerUrl}
                       isOpen={isOpenViewBanner}
                       onClose={() => setIsOpenViewBanner(false)}/>
      <PopupSuccess isLoading={loadingPopup}
                    message={message}
                    closePopup={() => {
                      setLoadingPopup(false);
                      setMessage(null)
                    }}/>

      <ListAddressStore addressList={offer.addressList}
                        offer={offer}
                        isOpen={isOpenPopupListStore}
                        title={`${offer.ownerName} ${(offer?.addressList && offer?.addressList.length > 1) ? '- Hệ thống chuỗi cửa hàng': ''}`}
                        onClose={() => setIsOpenPopupListStore(false)} />
    </>
  );
};

export default OfferDetail;
