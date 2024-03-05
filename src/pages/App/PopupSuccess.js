import { useEffect, useState } from 'react';
import { PUBLIC_URL } from 'config/constants';

const PopupSuccess = ({message, isLoading, closePopup, duration}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
      if (isLoading){
        setVisible(true)
        setTimeout(() => {
          setVisible(false);
          closePopup();
        }, duration || 2000);
      }
    }, [isLoading]);

    return (
      visible &&
      <div className='z-10 w-full fixed top-0 left-0 flex justify-between items-center popup-success'
           style={{ height: '100%'}}>
        <div className='w-full flex items-center justify-center'>
          <div className='w-8/12 popup-content p-7'>
            <div className='w-full flex justify-center'>
              <img src={PUBLIC_URL + 'images/Verify.png'} alt='' />
            </div>
            <div className='w-full flex justify-center text-slate-200 text-center'>
              {message || 'Successfully'}
            </div>
          </div>
        </div>
      </div>
    )
}

export default PopupSuccess