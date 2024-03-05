import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';

import useFilter from 'hooks/useFilter';
import api from 'services/offer';
import localStorage from 'systems/utils/localStorage';

import { LOCAL_STORAGE_KEY } from 'config/constants';
import { Icon } from 'components';
import classNames from 'classnames';
import {makeId} from 'systems/utils/functionCommon';
import useLoginToken from 'hooks/useLoginToken';

const SearchHistory = () => {
  const navigate = useNavigate();
  const {filter, updateFieldFilter, showSearchHistory } = useFilter();
  const {publicUrl} = useLoginToken();

  const [seeMore, setSeeMore] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [kV, setKV] = useState(null);

  useEffect(() => {
    setSearchHistory(localStorage.getItem(LOCAL_STORAGE_KEY.SEARCH_HISTORY) || []);
  }, [filter.formValue, filter.text]);

  useEffect(() => {
    api.offerKVSearch(publicUrl).then(({data}) => setKV(data));
  }, [])

  const handleSelectKeyword = (value) => {
    updateFieldFilter('text', value);
    updateFieldFilter('countSubmitSearch', makeId(30));
    showSearchHistory(false);
  };

  const handleRemoveKeyword = (keyword) => {
    const newSearchHistory = searchHistory.filter((item) => item !== keyword);
    setSearchHistory(newSearchHistory);
    localStorage.setItem(LOCAL_STORAGE_KEY.SEARCH_HISTORY, newSearchHistory);
  };

  const clearAllHistories = () => {
    localStorage.removeAt(LOCAL_STORAGE_KEY.SEARCH_HISTORY);
    setSearchHistory([]);
    setSeeMore(!seeMore);
  }

  return (
    <div className={classNames('w-full mb-6')}>
      <div className="bg-white pl-6 pr-6">
        {/*<div className="font-semibold">Lịch sử tìm kiếm</div>*/}
        {
          kV &&
          <div key={uuid()}
               onClick={() => navigate('/offer-kv')}
               className="border-b py-6 flex items-center justify-between">
            <div className="flex-1 text-1-row pr-2">
              {kV.name}
            </div>
            <div
              className="font-thin text-4xl text-txt-10 pr-1"
              onClick={() => handleRemoveKeyword('')}
            >
              <img className='w-16 h-16' src={kV.thumbnailUrl} alt='' />
            </div>
          </div>
        }
        <div className="overflow-y-auto">
          {
            searchHistory?.map((keyword, index) => {
              if ((index > 2 && !seeMore) || (index >= 5 && seeMore)) return null;
              return (
                <div key={uuid()} className="border-b py-6 flex items-center justify-between">
                  <div className="flex-1 ellipse-2-line" onClick={() => handleSelectKeyword(keyword)}>
                    {keyword}
                  </div>
                  <div
                    className="font-thin text-4xl text-txt-10 pr-1"
                    onClick={() => handleRemoveKeyword(keyword)}
                  >
                    ✕
                  </div>
                </div>
              );
            })
          }
        </div>
        {searchHistory.length > 0 && (
          <div
            className="p-5 text-gray-500 text-center text-2xl"
          >
            {(seeMore || searchHistory.length < 4) ? (
              <>
                {/*Ẩn bớt <Icon type="chevron-up-thin" className="pl-3" />*/}
                <span onClick={clearAllHistories}>Xóa lịch xử tìm kiếm</span>
              </>
            ) : (
              <span onClick={() => setSeeMore(!seeMore)}>
              Xem thêm <Icon type="chevron-down-thin" className="pl-3" />
            </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchHistory;
