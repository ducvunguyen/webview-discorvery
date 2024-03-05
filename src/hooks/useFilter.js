import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { actions } from 'redux/slices/filterSlice';

const useFilter = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const getFilterToSubmit = () => getFilterValue('categories', 'categoryId');

  const getFilterToSubmitCard = () => getFilterValue('cards', 'cardId');

  const getFilterValue = (keyObject, objectId) => {
    const filterValue = {
      text: filter.text,
    };

    filterValue[objectId] = filter.formValue[keyObject]?.map((item) => item.id);

    Object.keys(filterValue).forEach((property) => {
      if (_.isEmpty(filterValue[property])) {
        delete filterValue[property];
      }
    });

    return filterValue;
  }


  const showSearchHistory = (value) => dispatch(actions.showSearchHistory(value));

  return {
    filter,
    updateFieldFilter: (field, value) => dispatch(actions.updateFieldFilter({ field, value })),
    resetFilter: () => dispatch(actions.resetFilter()),
    showSearchHistory,
    getFilterToSubmit,
    getFilterToSubmitCard
  };
};

export default useFilter;
