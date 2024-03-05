import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import OfferList from 'pages/App/OfferList';
import api from 'services/offer';
import apiVoucher from 'services/voucher';
import { Header, Tabs } from 'components';
import VoucherList from '../App/VoucherList';
import useQueryParamURL from 'hooks/useQueryParamURL';

const { TabPane } = Tabs;

const FavoriteOffers = () => {
  const navigate = useNavigate();
  const queryURL = useQueryParamURL();
  const tab = queryURL.get('tab');

  const [loading, setLoading] = useState(true);
  const [favoriteOffers, setFavoriteOffers] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [offerType, setOfferType] = useState(tab || '1');
  const [offerVouchers, setOfferVouchers] = useState([]);
  const [pageVoucher, setPageVoucher] = useState(0);
  const [totalPage, setTotalPage] = useState(null);

  useEffect(() => {
    if (offerType != 3)
      fetchFavoriteOffers(0);
    else fetchVoucherOwner(0);
  }, [offerType]);

  const fetchFavoriteOffers = async (currentPage) => {
    setLoading(true);
    try {
      const { data } = await api.getFavoriteOffers({
        page: currentPage,
        pageSize: 10,
        expired: offerType == 1 ? false : true,
      });
      const { offers, totalPage } = data;
      setFavoriteOffers([...favoriteOffers, ...offers]);
      setHasMore(currentPage + 1 < totalPage);
      setPage(currentPage);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const fetchVoucherOwner = currentPage => {
    // if (totalPage != null && totalPage === currentPage)
    //   return;

    setLoading(true);
    apiVoucher.voucherOwner({
      page: currentPage,
      size: 10,
    }).then(({data}) => {
      const { voucherDTOS, totalPage } = data;
      // setOfferVouchers([...offerVouchers, ...voucherDTOS]);
      setOfferVouchers(voucherDTOS);
      // setHasMore(currentPage + 1 < totalPage);
      // setPageVoucher(currentPage);
    }).finally(() => setLoading(false))
  }

  const handleChangeTab = (tabKey) => {
    if (tabKey == offerType) return;
    setOfferVouchers([]);
    setOfferType(Number(tabKey));
    setPage(0);
    setFavoriteOffers([]);
    setHasMore(false);
    navigate('?tab='+tabKey);
  };

  const handleEliminateLike = offers => {
    const offerEliminateLikes = offers.filter(item => item.liked);
    setFavoriteOffers([...offerEliminateLikes])
  }

  return (
    <div className="bg-white layout">
      <div id="favorite-header">
        <Header title="Ưu đãi đã lưu" goBack={() => navigate('../')} />
        <Tabs defaultActiveTab={offerType} onChange={handleChangeTab}>
          <TabPane label="Chưa sử dụng" tabKey="1" />
          <TabPane label="Đã dùng" tabKey="2" />
          <TabPane label="Voucher" tabKey="3" />
        </Tabs>
      </div>
      {/*<OfferList*/}
      {/*  fetchOffers={fetchFavoriteOffers}*/}
      {/*  offers={favoriteOffers}*/}
      {/*  loading={loading}*/}
      {/*  page={page}*/}
      {/*  hasMore={hasMore}*/}
      {/*  height={`calc(100vh - ${document.getElementById('favorite-header')?.offsetHeight}px)`}*/}
      {/*  onChangeLike={offers => handleEliminateLike(offers)}*/}
      {/*/>*/}
      {
        offerType != 3 ?
          <OfferList
            fetchOffers={fetchFavoriteOffers}
            offers={favoriteOffers}
            loading={loading}
            page={page}
            hasMore={hasMore}
            height={`calc(100vh - ${document.getElementById('favorite-header')?.offsetHeight}px)`}
            onChangeLike={offers => handleEliminateLike(offers)}
          /> :
          <VoucherList
            page={pageVoucher}
            vouchers={offerVouchers}
            loading={loading}
            hasMore={hasMore}
            fetchVoucherOwner={fetchVoucherOwner}
            height={`calc(100vh - ${document.getElementById('favorite-header')?.offsetHeight}px)`}
          />
      }
    </div>
  );
};

export default FavoriteOffers;
