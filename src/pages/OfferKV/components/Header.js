import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Icon } from 'components';

const Header = ({ headerContainerPosition, title }) => {
  const navigate = useNavigate();

  const handleGoBack = () => navigate(-1);
  const bgOpacity = (headerContainerPosition * -1) / 85;
  return (
    <div
      className="flex justify-between items-center fixed z-10 top-0 w-full px-6"
      style={{
        backgroundColor: `rgba(20, 30, 210, ${bgOpacity})`,
        minHeight: 60,
        height: 85 - bgOpacity * 15, // defaultHeight - paddingY
      }}
    >
      <div
        style={{boxShadow: bgOpacity === 0 ? 'rgb(0 0 0 / 11%) 0px 0px 4px' : 'none'}}
        className={classNames('flex justify-center items-center rounded-full w-14 h-14 text-3xl', {
          'bg-white text-icon-40': bgOpacity === 0,
          'text-white': bgOpacity !== 0,
        })}
        onClick={handleGoBack}
      >
        <Icon type="chevron-left" className="pr-1" />
      </div>

      <div className="text-1-row text-center text-3xl font-semibold text-white w-8/12"
           style={{ opacity: bgOpacity }}>
        {title}
      </div>
      <div></div>
    </div>
  );
};

export default Header;
