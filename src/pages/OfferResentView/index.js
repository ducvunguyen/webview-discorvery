import { useEffect, useState } from 'react';
import OfferList from 'pages/App/OfferList';
import api from 'services/offer';

const OfferRecentlyView = () => {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState({});
  const [offersByCategory, setOffersByCategory] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    fetchOffersRecentlyView(page);
  }, []);

  const fetchOffersRecentlyView = async (currentPage) => {
    try {
      const { data } = await api.recentlyView({
        page: currentPage,
        size: 10,
      });
      const { category, offers, totalPage } = data;

      setOffersByCategory([...offersByCategory, ...offers]);
      setCategory(category);
      setHasMore(currentPage + 1 < totalPage);
      setPage(currentPage);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <OfferList
        title='Xem gần đây'
        fetchOffers={fetchOffersRecentlyView}
        offers={offersByCategory}
        loading={loading}
        page={page}
        hasMore={hasMore}
        onChangeLike={offers => setOffersByCategory([...offers])}
      />
    </>
  );
};

export default OfferRecentlyView;
