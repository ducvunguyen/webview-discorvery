import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Icon } from 'components';

const Header = () => {
  const navigate = useNavigate();

  const handleGoBack = () => navigate(-1);

  return (
     <>
       <div className="flex justify-between items-center w-full px-6"
            style={{
              backgroundColor: `rgba(20, 30, 210)`,
              minHeight: 60,
              height: 70 , // defaultHeight - paddingY
            }}>

         <div
           className={classNames('flex justify-center items-center rounded-full w-14 h-14 text-3xl text-white')}
           onClick={handleGoBack}
         >
           <Icon type="chevron-left" className="pr-1" />
         </div>
       </div>
     </>
   )
 }

 export default Header;