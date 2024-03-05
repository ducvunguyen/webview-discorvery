import { useNavigate } from 'react-router-dom';

import Icon from 'components/Icon';

const Header = ({ title, left = true, leftComponent, right = true, rightComponent, goBack }) => {
  const navigate = useNavigate();

  const handleGoBack = () => (goBack ? goBack() : navigate(-1));

  return (
    <div className="sticky top-0 z-20 ">
      <div className="relative h-24 bg-primary text-white">
        <div className="absolute top-0 left-0 flex justify-start items-center h-full pl-5">
          {left && (leftComponent || <Icon type="chevron-left" onClick={handleGoBack} />)}
        </div>
        <div className="flex justify-center items-center text-2xl h-full font-medium w-full">
          {title}
        </div>
        <div className="absolute top-0 right-0 flex justify-end items-center h-full pr-5">
          {right && rightComponent}
        </div>
      </div>
    </div>
  );
};

export default Header;
