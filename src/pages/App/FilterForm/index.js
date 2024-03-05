import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'components';
import SelectTags from './components/SelectTags';
import useCategory from 'hooks/useCategory';
import useFilter from 'hooks/useFilter';
import useCard from 'hooks/useCard';
import SelectDistrict from './components/SelectDistrict';
import useDistrict from 'hooks/useDistrict';
import SelectRankCard from './components/SelectRankCard';
import useRankCard from 'hooks/useRankCard';

const FilterForm = ({ onClose, open }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const categories = useCategory();
  const cards = useCard();

  const { updateDistrict, updateResetForm, dataDistrict } = useDistrict();
  const { filter, updateFieldFilter, showSearchHistory } = useFilter();
  const { rankCard, updateRankCard, resetRankCard } = useRankCard();

  let [formValue, setFormValue] = useState({});
  const [resetForm, setResetForm] = useState(0);
  const [cityCode, setCityCode] = useState(null);
  const [districtCode, setDistrictCode] = useState(null);
  const [dataSelectRankCard, setDataSelectRankCard] = useState(rankCard);

  const handleChangeFormItem = (field, value) => {
    setFormValue({ ...formValue, [field]: value });
  };

  useEffect(() => {
    if (filter.formValue.categories && filter.formValue.cards)
      setFormValue({ ...filter.formValue });
  }, [filter]);

  useEffect(() => {
    if (dataDistrict) {
      setCityCode(dataDistrict?.cityCode);
      setDistrictCode(dataDistrict?.districtCode);
    }
  }, [dataDistrict.cityCode, dataDistrict.districtCode]);

  const handleCloseForm = () => {
    // handleResetForm();
    onClose();
  };

  const handleResetForm = () => {
    setCityCode(null);
    setDistrictCode(null);
    setDataSelectRankCard({
      cardClass: null,
      cardType: null,
      issuers: null,
    });
    updateResetForm(true);
    resetRankCard();
    setFormValue({ categories: [], cards: [] });
    setResetForm(resetForm + 1);
  };

  const handleSubmit = () => {
    updateDistrict({ data: cityCode, nameObject: 'cityCode' });
    updateDistrict({ data: districtCode, nameObject: 'districtCode' });
    showSearchHistory(false);
    updateFieldFilter('formValue', { ...formValue });
    updateRankCard(dataSelectRankCard);
    if (location.pathname !== '/search') {
      return navigate('/search');
    }
    onClose();
  };

  return (
    <Modal onClose={handleCloseForm} open={open}>
      <div className='text-2xl font-semibold text-white bg-A1-70 py-6 text-center relative'>
        Bộ lọc tìm kiếm
        <span
          className='text-7xl font-thin leading-none absolute top-0 right-5'
          onClick={handleCloseForm}
        >
          ✕
        </span>
      </div>

      <div className={'px-6 pt-6 pb-20 overflow-auto'}>
        <SelectDistrict
          defaultValueCity={dataDistrict?.cityCode}
          defaultValueDistrict={dataDistrict?.districtCode}
          onChangeCity={event => setCityCode(event)}
          onChangeDistrict={event => setDistrictCode(event)}
        />
        <div className='mt-4'>
          <SelectRankCard
            defaultValue={dataSelectRankCard}
            onChange={setDataSelectRankCard}
          />
        </div>
        <div className='mt-4'>
          <SelectTags
            label='Theo danh mục'
            field='categories'
            options={categories}
            defaultValue={filter?.formValue?.categories}
            resetForm={resetForm}
            open={open}
            onChange={handleChangeFormItem}
          />
        </div>

        <SelectTags
          label='Theo hình thức thanh toán'
          field='cards'
          options={cards}
          defaultValue={filter?.formValue?.cards}
          resetForm={resetForm}
          open={open}
          onChange={handleChangeFormItem}
        />
        <br />
      </div>

      <div
        className='flex justify-between bg-white px-8 pb-6 pt-6 absolute w-full bottom-0 border-t'
        style={{ boxShadow: '0px -1px 4px rgba(130, 151, 224, 0.28)' }}
      >
        <Button className='mr-4 py-4' outlined onClick={handleResetForm}>
          Thiết lập lại
        </Button>
        <Button className='ml-4' onClick={handleSubmit}>
          Áp dụng
        </Button>
      </div>
    </Modal>
  );
};

export default FilterForm;