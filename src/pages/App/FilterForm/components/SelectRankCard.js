import SelectReact from 'react-select';
import { useEffect, useState } from 'react';

const SelectRankCard = ({defaultValue, onChange}) => {
  const [dataSelect, setDataSelect] = useState(defaultValue);

  useEffect(() => {
    setDataSelect(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    onChange(dataSelect)
  }, [dataSelect]);

  const handleChangeSelect = name => value => {
    const cloneDataSelect = {...dataSelect};

    if (name === 'issuers'){
      cloneDataSelect.cardType = null;
      cloneDataSelect.cardClass = null;
    }

    if (name === 'cardType')
      cloneDataSelect.cardClass = null;

    cloneDataSelect[name] = value;
    setDataSelect({...cloneDataSelect});
  }

  return (
    <>
      <div className="font-semibold mb-6 text-txt-50">Theo phân loại thẻ</div>
      <div className="flex justify-between text-black">
        <div className='w-5/12'>Tổ chức phát hành</div>
        <div className='w-7/12'>
          <SelectReact
            placeholder='Tổ chức phát hành'
            isClearable
            value={dataSelect?.issuers}
            isSearchable={false}
            onChange={handleChangeSelect('issuers')}
            options={Object.keys(cardOffer).map(item => {
              return { value: item, label: item }
            })}
          />
        </div>
      </div>
      <div className="flex justify-between text-black mt-3">
        <div className='w-5/12'>Loại thẻ</div>
        <div className='w-7/12'>
          <SelectReact
            placeholder='Loại thẻ'
            isClearable
            value={dataSelect?.cardType}
            isSearchable={false}
            onChange={handleChangeSelect('cardType')}
            options={dataSelect.issuers ? Object.keys(cardOffer[dataSelect?.issuers?.label]).map(item => {
              return {
                value: item, label: item
              }
            }): []}
          />
        </div>
      </div>
      <div className="flex justify-between text-black mt-3">
        <div className='w-5/12'>Hạng thẻ</div>
        <div className='w-7/12'>
          <SelectReact
            placeholder='Hạng thẻ'
            isClearable
            isSearchable={false}
            value={dataSelect.cardClass}
            onChange={handleChangeSelect('cardClass')}
            options={(dataSelect?.issuers && dataSelect?.cardType) ?
              cardOffer[dataSelect?.issuers?.value][dataSelect?.cardType?.value].map(item => {
              return { value: item, label: item }
            }): []}
          />
        </div>
      </div>
    </>
  )
}

export default SelectRankCard;

export const cardOffer = {
  "Visa": {
    "Debit": [
      "Classic",
      "Gold",
      "Platinum"
    ],
    "Credit": [
      "Classic",
      "Gold",
      "Platinum",
      "Priority",
      "Infinite"
    ]
  },
  "JCB": {
    "Debit": [],
    "Credit": [
      "Classic",
      "Gold",
      "Platinum"
    ]
  }
}