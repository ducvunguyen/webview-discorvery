import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateDistrict } from '../redux/slices/districtSlice';
import api from 'services/offer';

const useDistrict = () => {
  const dispath = useDispatch();
  const dataDistrict = useSelector((state) => state.district);

  useEffect(() => {
    if (dataDistrict.cities.length === 0)
      api.getDistrict({districtType: 'PROVINCE', parentCode: null}).then(({data}) => {
        dispath(updateDistrict({nameObject: 'cities', data}))
      })
  }, [])

  return {
    dataDistrict,
    updateListDistrict: parentCode => api.getDistrict({districtType: 'DISTRICT', parentCode}).then(({data}) => {
      dispath(updateDistrict({nameObject: 'districts', value: data}))
    }),
    updateDistrict: ({data, nameObject}) => {
      dispath(updateDistrict({nameObject, data}))
    },
    updateResetForm: isReset => dispath(updateDistrict({nameObject: 'isResetForm', data: isReset}))
  }
}

export default useDistrict;