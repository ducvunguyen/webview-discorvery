import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'components';

const HeaderQrCode = () => {
  const navigate = useNavigate();

  const handleGoBack = () => navigate(-1);

  return (
    <div
      className="flex justify-between items-center w-full px-6"
      style={{
        minHeight: 60,
        height: 85,
      }}
    >
      <div
        className={classNames('flex justify-center items-center rounded-full w-14 h-14 text-3xl text-white')}
        onClick={handleGoBack}
      >
        <Icon type="chevron-left"  />
      </div>

      <div className="text-1-row text-center text-3xl font-semibold text-white text-2xl" style={{ width: '80%' }}>
        MÃ VOUCHER
      </div>
      <div className={classNames('flex justify-center items-center rounded-full w-14 h-14 text-3xl text-white')} />
    </div>
  );
};

export default HeaderQrCode;
