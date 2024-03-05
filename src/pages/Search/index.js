import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import _ from 'lodash';
import { Header, Icon } from 'components';
import List from './components/List';
import SearchBox from 'pages/App/SearchBox';
import FilterTag from './components/FilterTag';
import useUserLocation from 'hooks/useUserLocation';
import useFilter from 'hooks/useFilter';
import SearchHistory from './components/SearchHistory';

const Search = () => {
  const navigate = useNavigate();
  const userLocation = useUserLocation();
  const { resetFilter, filter } = useFilter();

  useEffect(() => {
    // if (_.isEmpty(getFilterToSubmit()) && _.isEmpty(getFilterToSubmitCard()) && !filter.isShowSearchHistory) {
      // showSearchHistory(true);
    // }
  }, [filter.formValue, filter.text]);

  const handleGoBack = () => {
    navigate(-1);
    setTimeout(() => {
      resetFilter();
    }, 323);
  };

  return (
    <div
      className={classNames('layout', {
        'bg-white': _.isEmpty(filter.formValue) || filter.isShowSearchHistory,
        'bg-background': !(_.isEmpty(filter.formValue) || filter.isShowSearchHistory),
      })}
    >
      <div id="search-header" className="sticky top-0 z-20">
        <Header
          title={
            <div className="w-full pl-16 pr-6">
              <Link to="/offers-in-map">
                <div className="text-base">Địa điểm áp dụng</div>
                <div className="flex items-center text-2xl">
                  <Icon type="location" className="text-icon-60 mr-2 mt-1" />
                  {userLocation}
                </div>
              </Link>
            </div>
          }
          goBack={handleGoBack}
        />
        <SearchBox />
        {!filter.isShowSearchHistory && <FilterTag />}
      </div>
      <div className='w-full bg-background'>
        {
          filter.isShowSearchHistory &&
          <SearchHistory />
        }
        <List />
      </div>
    </div>
  );
};

export default Search;
