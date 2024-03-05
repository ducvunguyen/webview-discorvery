import { useState, useEffect, useLayoutEffect } from 'react';
import classNames from 'classnames';
import { Icon } from 'components';
import useFilter from 'hooks/useFilter';

const SelectTags = ({ label, field, options, onChange, resetForm, defaultValue = [], open }) => {
  const { filter } = useFilter();
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    setSelectedOptions(filter?.formValue[field] || []);
  }, [filter?.formValue[field]]);

  useEffect(() => {
    setSelectedOptions([]);
    onChange(field, []);
  }, [resetForm]);

  useLayoutEffect(() => {
    if (defaultValue?.length > 0) {
      setSelectedOptions(defaultValue);
    }
  }, [open]);

  const handleChangeOption = (option) => (event) => {
    event.preventDefault();
    event.stopPropagation();

    let newSelectedOptions = [];
    const isSelected = !!selectedOptions?.find((op) => op?.id === option?.id);

    if (isSelected) {
      newSelectedOptions = selectedOptions?.filter((op) => op?.id !== option?.id);
    } else {
      newSelectedOptions = [...selectedOptions, option];
    }
    onChange(field, newSelectedOptions);
    setSelectedOptions(newSelectedOptions);
  };

  return (
    <div>
      <div className="font-semibold mb-6 text-txt-50">{label}</div>
      <div className="flex flex-wrap">
        {options?.map((option) => {
          const isSelected = !!selectedOptions?.find((op) => op?.id === option?.id);
          return (
            <div
              key={option.id}
              className={classNames(
                'rounded-3xl flex items-center px-4 py-1 mr-6 mb-4 border bg-white',
                {
                  'text-txt-40': !isSelected,
                  'border-primary text-primary': isSelected,
                }
              )}
              onClick={handleChangeOption(option)}
            >
              {isSelected && <Icon type="tick" className="mr-2 text-xl" />}
              {option?.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectTags;
