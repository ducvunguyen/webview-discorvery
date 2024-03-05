import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import OfferList from 'pages/App/OfferList';
import api from 'services/offer';
import useFilter from 'hooks/useFilter';
import useDistrict from 'hooks/useDistrict';
import useRankCard from 'hooks/useRankCard';
import useLoginToken from 'hooks/useLoginToken';

const List = () => {
  const { filter, getFilterToSubmit, getFilterToSubmitCard } = useFilter();
  const { dataDistrict: { cityCode, districtCode }} = useDistrict();
  const { rankCard: {cardClass, cardType, issuers} }  = useRankCard();
  const {publicUrl} = useLoginToken();

  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setOffers([]);
    if (!_.isEmpty((issuers)) || !_.isEmpty(getFilterToSubmit()) || !_.isEmpty(getFilterToSubmitCard())
      || !_.isEmpty((cityCode) || !_.isEmpty((issuers)))) {fetchOffers(0);}
    else getAllOffer();
  }, [filter.countSubmitSearch, filter.formValue]);

  const getAllOffer = () => {
    setLoading(true);
    api.offerAll(publicUrl).then(({ data }) => {
      setPage(0);
      setHasMore(false);
      setOffers(data.offers);
    }).finally(() => setLoading(false));
  };

  const fetchOffers = async (currentPage) => {
    setLoading(true);
    try {
      const { data } = await api.searchOffers({
        page: currentPage,
        pageSize: 8,
        provinceCode: cityCode?.value,
        districtCode: districtCode?.value,
        cardClass: cardClass?.value,
        cardType: cardType?.value,
        issuers: issuers?.value,
        ...getFilterToSubmit(),
        ...getFilterToSubmitCard(),
      });
      setOffers(() => (currentPage === 0 ? data?.offers : [...offers, ...data?.offers]));
      setHasMore(currentPage + 1 < data?.totalPage);
      setPage(currentPage);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <OfferList
      fetchOffers={fetchOffers}
      offers={offers}
      loading={loading}
      page={page}
      hasMore={hasMore}
      height={`calc(100vh - ${document.getElementById('search-header')?.offsetHeight}px)`}
      // height={`auto`}
      onChangeLike={data => setOffers([...data])}
    />
  );
};

export default List;
