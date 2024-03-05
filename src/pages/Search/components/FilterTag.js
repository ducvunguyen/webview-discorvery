import React from 'react';
import { Icon } from 'components';
import useFilter from 'hooks/useFilter';

const Tag = ({ item, onClose, field }) => {
  const handleClickClose = () => onClose(item, field);
  return (
    <div className="flex justify-center items-center text-2xl px-3 py-2 rounded-2xl bg-A1-90 mr-3 mb-3">
      <span className="text-white font-light">{item?.name}</span>
      <Icon type="close-circle" className="ml-2.5" onClick={handleClickClose} />
    </div>
  );
};

const FilterTag = () => {
  const {
    filter: { formValue },
    updateFieldFilter,
  } = useFilter();

  const handleRemoveFilter = (item, field) => {
    let fieldValue;
    switch (field) {
      case 'categories':
        fieldValue = formValue[field].filter((category) => category?.id !== item?.id);
        break;

      case 'cards':
        fieldValue = formValue[field].filter((card) => card?.id !== item?.id);
        break;
    }
    updateFieldFilter('formValue', { ...formValue, [field]: fieldValue });
  };

  const renderFilter = (field) => {
    switch (field) {
      case 'cards':
        return formValue[field]?.map((item) => (
          <Tag key={item?.id} item={item} onClose={handleRemoveFilter} field={field} />
        ));

      case 'categories':
        return formValue[field]?.map((item) => (
          <Tag key={item?.id} item={item} onClose={handleRemoveFilter} field={field} />
        ));

      default:
        return;
    }
  };

  return (
    <div className="py-4 px-6 flex flex-wrap">
      {Object.keys(formValue).map((field) => renderFilter(field))}
    </div>
  );
};

export default React.memo(FilterTag);
