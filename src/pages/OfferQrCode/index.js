import { useRef, useState } from 'react';
import QRCode from 'react-qr-code';
import { useParams } from "react-router-dom";
import HeaderQrCode from './components/HeaderQrCode';
import { exportAsImage } from 'systems/utils/functionCommon';
import PopupSuccess from '../App/PopupSuccess';

const OfferQrCode = () => {
  const { code } = useParams();

  const [loadingPopup, setLoadingPopup] = useState(false);
  const [message, setMessage] = useState(null);

  const exportRef = useRef();

  const handleExportCode = async element =>{
    setLoadingPopup(true);
    setMessage('Đang tải mã vui lòng đợi trong giấy lát');
    await exportAsImage(element, `Code_${code}.png`);
  }

  const handleShare = async element => {
    let shareData = {
      title: 'MDN',
      text: 'Learn web development on MDN!',
    }

    if (!navigator.canShare) {
      setMessage('Chức năng này không hỗ trợ trên android vui lòng chuyển qua thiết bị Iphone')
      setLoadingPopup(true);
    }
    else if (navigator.canShare(shareData))
      navigator.share(shareData);
    else {
      setMessage('Specified data cannot be shared')
      setLoadingPopup(true);
    }
  }

  return  (
    <div className='h-screen flex flex-col items-center justify-between' style={{background: '#6680e6'}}>
      <HeaderQrCode/>
      <div className='w-full h-auto flex items-center justify-center relative bottom-24'>
        <div ref={exportRef} id='screenshot-code' className='bg-white p-5 rounded-xl'>
          <QRCode size={250} value={code || ''} />
          <div className='font-bold mt-6 text-center text-3xl'>
            Mã: {code}
          </div>
        </div>
        {/*<div className='flex justify-around w-full p-2 border-t-2 border-dashed mt-4 w-full border-slate-300 items-center h-full'>*/}
        {/*   <div className='flex p-3' onClick={() => handleExportCode(exportRef.current)}>*/}
        {/*     /!*<Icon type='download' className='global-icon-download' />*!/*/}
        {/*       <span className='pt-1 pl-2'>Lưu mã</span>*/}
        {/*   </div>*/}

        {/*  <span className='flex p-3'>*/}
        {/*    <img src={PUBLIC_URL + 'images/Share.png'} alt='' />*/}
        {/*    <span className='pl-2' onClick={() => handleShare(exportRef.current)}> Chia sẻ mã</span>*/}
        {/*   </span>*/}
        {/*</div>*/}
      </div>
      <div></div>
      <PopupSuccess isLoading={loadingPopup}
                    message={message}
                    closePopup={() => {
                      setLoadingPopup(false);
                      setMessage(null)
                    }}/>
    </div>
  )
}

export default OfferQrCode;