import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OfferList from 'pages/App/OfferList';
import api from 'services/offer';
import useLoginToken from 'hooks/useLoginToken';

const OfferByCategory = () => {
  const { id: categoryId } = useParams();
  const { publicUrl} = useLoginToken();

  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState({});
  const [offersByCategory, setOffersByCategory] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    fetchOffersByCategory(page);
  }, []);

  const fetchOffersByCategory = async (currentPage) => {
    try {
      const { data } = await api.getOffersByCategory({
        page: currentPage,
        pageSize: 10,
        categoryId,
        expired: false,
      }, publicUrl);
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
    <OfferList
      title={category?.name}
      fetchOffers={fetchOffersByCategory}
      offers={offersByCategory}
      loading={loading}
      page={page}
      hasMore={hasMore}
      onChangeLike={offers => setOffersByCategory([...offers])}
    />
  );
};

export default OfferByCategory;
