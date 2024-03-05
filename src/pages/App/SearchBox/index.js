import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { Icon } from 'components';
import FilterForm from '../FilterForm';
import useFilter from 'hooks/useFilter';
import localStorage from 'systems/utils/localStorage';
import { LOCAL_STORAGE_KEY } from 'config/constants';
import './index.scss';
import { makeId } from 'systems/utils/functionCommon';
import useLoginToken from 'hooks/useLoginToken';

const SearchBox = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { filter, updateFieldFilter, showSearchHistory, getFilterToSubmit, getFilterToSubmitCard } = useFilter();
  const {isLoginToken} = useLoginToken();

  const [showFilterForm, setShowFilterForm] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const _inputRef = useRef();

  const isSearchPage = useMemo(() => location.pathname === '/search', [location.pathname]);

  // from search history select keyword
  useEffect(() => {
   if (filter.countSubmitSearch){
     if (window.location.href.includes('webview/search')) setInputValue(filter.text);
     else setInputValue('');
     handleUpdateSearchHistory(filter.text);
   }
  }, [filter.countSubmitSearch]);

  // empty filter
  useEffect(() => {
    // if (
    //   isSearchPage &&
    //   _.isEmpty(getFilterToSubmit()) &&
    //   _inputRef.current !== document.activeElement
    // ) {
    //   _inputRef.current?.focus();
    // }
  }, [filter.formValue]);

  const handleChangeInput = (e) => {
    const { value } = e.target;
    if (filter.countSubmitSearch)
      updateFieldFilter('countSubmitSearch', 0);

    updateFieldFilter('text', value.trim());
    setInputValue(value);
  };

  const handleClickInput = () => !isSearchPage && navigate('/search');

  const handleShowFilterForm = () => {
    setShowFilterForm(!showFilterForm);
  };

  const handleUpdateSearchHistory = (value) => {
    let newSearchHistory = localStorage.getItem(LOCAL_STORAGE_KEY.SEARCH_HISTORY, []);
    newSearchHistory.unshift(value.toString().trim());
    newSearchHistory = [...new Set(newSearchHistory)].filter((keyword) => keyword);
    if (newSearchHistory.length > 10) {
      newSearchHistory.length = 10;
    }
    localStorage.setItem(LOCAL_STORAGE_KEY.SEARCH_HISTORY, newSearchHistory);
  };

  const handleOnSubmit = () => {
    _inputRef.current.blur();
    updateFieldFilter('text', inputValue.trim());
    updateFieldFilter('countSubmitSearch', makeId(30));
    handleUpdateSearchHistory(inputValue);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleOnSubmit();
      showSearchHistory(false);
    }
  };

  return (
    <div
      id="home-search-box"
      className="px-6 pt-2 h-12 mb-12 bg-primary text-primary relative text-2xl"
    >
      <div className="search-input absolute flex items-center justify-between p-2 bg-white border rounded-md">
        <div className="flex flex-1 items-center justify-between p-4" onClick={handleClickInput}>
          <span>
            <Icon type="search-fill" className="text-3xl mr-4" />
          </span>
          <input
            className="text-txt-20"
            placeholder="Tìm kiếm"
            type="search"
            value={inputValue}
            onChange={handleChangeInput}
            onKeyUp={handleKeyUp}
            onClick={() => {
              if (!filter.isShowSearchHistory) {
                showSearchHistory(!filter.isShowSearchHistory);
              }
            }}
            autoFocus={_.isEmpty(getFilterToSubmit()) && _.isEmpty(getFilterToSubmitCard()) && isSearchPage}
            ref={_inputRef}
          />
        </div>
        {
          isLoginToken &&
          <div
            className="flex justify-center items-center border-l h-full p-5 pr-3"
            onClick={handleShowFilterForm}
          >
            Bộ lọc
            <Icon type="filter" className="ml-3" />
          </div>
        }
      </div>
      {
        isLoginToken &&
        <FilterForm onClose={handleShowFilterForm} open={showFilterForm} />
      }
    </div>
  );
};

export default SearchBox;
