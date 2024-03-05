import SearchBox from 'pages/App/SearchBox';
import { HomeHeader, Categories, HotDeal, OfferByCategory, NearBy, RecentlyView, PopupKV } from './components';
import useCategory from "hooks/useCategory";

const Home = () => {
  const categories = useCategory();

  return (
    <div className="bg-background layout">
      <HomeHeader />
      <SearchBox />
      <div className="p-6">
        <Categories />
        <HotDeal />
        <NearBy />
        {
          categories &&
          categories.map(({show}, index) =>
            show && <OfferByCategory categories={categories} key={'category'+index} positionCategory={index} />
          )
        }
        <RecentlyView />
      </div>
      <PopupKV/>
    </div>
  );
};

export default Home;
