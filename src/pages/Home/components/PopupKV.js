import { useEffect, useRef, useState } from 'react';
import api from 'services/offer';
import classNames from 'classnames';
import { Icon } from 'components';
import { useNavigate } from 'react-router-dom';
import useTurnOffPopupKV from 'hooks/useTurnOffPopupKV';
import useLoginToken from 'hooks/useLoginToken';

const PopupKV = () => {
  const navigate = useNavigate();
  const { isOpenPopup, turnOffPopup } = useTurnOffPopupKV()
  const {isLoginToken} = useLoginToken();

  const _popupRef = useRef();
  const [kv, setKV] = useState(null);
  const [isOpen, setIsOpen] = useState(isOpenPopup);

  useEffect(() => {
    if (isOpen && isLoginToken) {
      api.offerKVPopup().then(({data}) => {
        document.body.style.overflowY = 'hidden';
        if (!data)
          handleClosePopup();
        else setKV(data);
      }).catch(() => handleClosePopup());
    }
  }, [isLoginToken]);

  window.onclick = event => {
    if(event.target == _popupRef.current)
      return handleClosePopup();
  }

  const handleClosePopup = () => {
    document.body.style.overflowY = 'auto';
    turnOffPopup();
    setIsOpen(false);
  }

  const handleRedirect = () => {
    handleClosePopup();
    if (kv.type === 'POPUP_OFFER')
      return navigate(`offers/${kv.offerId}`);

    return navigate('/offer-kv?galleryId='+kv.id);
  }

  if (!isOpen || !kv){
    return null;
  }

  return (
    <div className='w-full h-full flex items-center justify-center fixed z-20 top-0'
         ref={_popupRef}
         style={{background: 'rgba(0,0,0,0.2)', height: '100vh'}}>
      <div className={classNames('rounded-full fixed text-3xl w-10/12')}>
        <div className='float-right'>
          <div onClick={handleClosePopup} className='rounded-full w-14 h-14 flex justify-center items-center bg-slate-300 relative top-10 left-3'>
            <Icon type="icon-x-mark-solid" className="w-4 color-icon-white" />
          </div>
        </div>
        <img className='w-full' src={kv?.popupUrl} onClick={handleRedirect}/>
      </div>
    </div>
  )
}

export default PopupKV;
