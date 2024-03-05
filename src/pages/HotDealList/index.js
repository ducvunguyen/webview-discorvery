import { useEffect, useState, useRef } from 'react';
import _ from 'lodash';

import OfferList from 'pages/App/OfferList';
import api from 'services/offer';
import useLoginToken from 'hooks/useLoginToken';

const HotDealList = () => {
  const {publicUrl} = useLoginToken();

  const [loading, setLoading] = useState(true);
  const [highlightOffers, setHighlightOffers] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    fetchHighlightOffers(page);
  }, []);

  const fetchHighlightOffers = async (currentPage) => {
    try {
      const { data } = await api.getHighlightOffers({
        page: currentPage,
        pageSize: 10,
      }, publicUrl);
      const { offers, totalPage } = data;

      setHighlightOffers([...highlightOffers, ...offers]);
      setHasMore(currentPage + 1 < totalPage);
      setPage(currentPage);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <OfferList
      title="Hot deal"
      fetchOffers={fetchHighlightOffers}
      offers={highlightOffers}
      loading={loading}
      page={page}
      hasMore={hasMore}
      onChangeLike={offers => setHighlightOffers([...offers])}
    />
  );
};

export default HotDealList;
