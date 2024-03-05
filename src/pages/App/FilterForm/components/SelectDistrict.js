import useDistrict from 'hooks/useDistrict';
import SelectReact from 'react-select';
import { useEffect, useState } from 'react';
import api from 'services/offer';

const SelectDistrict = ({onChangeCity, onChangeDistrict, defaultValueCity, defaultValueDistrict}) => {
  const { dataDistrict: {cities, isResetForm, cityCode, districtCode}, updateResetForm } = useDistrict();
  const [listDistrict, setListDistrict] = useState([]);
  const [cityId, setCityId] = useState(defaultValueCity);
  const [districtId, setDistrictId] = useState(defaultValueDistrict);

  useEffect(() => {
    if (cityId)
      getDistrict(cityId?.value);
  }, [cityId]);

  useEffect(() => {
    if (isResetForm){
      setListDistrict([]);
      setCityId(null);
      setDistrictId(null);
      updateResetForm(false);
    }
  }, [isResetForm])

  const handleChangeDistrict = nameObject => event => {
    if (nameObject === 'cityCode'){
      setCityId(event);
      if (!event) setListDistrict([]);
      setDistrictId(null)
      onChangeCity(event)
      onChangeDistrict(null)
    }else {
      setDistrictId(event);
      onChangeDistrict(event)
    }
  }

  const getDistrict = parentCode => {
    api.getDistrict({districtType: 'DISTRICT', parentCode}).then(({data}) =>
      setListDistrict(data));
  }

  return (
    <div>
      <div className="font-semibold mb-6 text-txt-50">Theo địa điểm áp dụng</div>
      <div className="flex justify-between text-black">
        <div className='w-5/12'>Tỉnh/ Thành phố</div>
        <div className='w-7/12'>
          <SelectReact
            value={cityId}
            placeholder='Tỉnh/ Thành phố'
            isClearable
            onChange={handleChangeDistrict('cityCode')}
            options={cities.map(item => {
              return {
                value: item.code, label: item.name
              }
            })}
          />
        </div>
      </div>
      <div className="flex justify-between text-black h-16 mt-3">
        <div className='w-5/12'>Quận/ Huyện</div>
        <div className='w-7/12 '>
          <SelectReact
            className='h-16'
            value={districtId}
            placeholder='Quận/ huyện'
            isClearable
            onChange={handleChangeDistrict('districtCode')}
            options={listDistrict.map(item => {
              return {value: item.code, label: item.type === 'quan' ? item.nameWithType : item.name}
            })}
          />
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default SelectDistrict