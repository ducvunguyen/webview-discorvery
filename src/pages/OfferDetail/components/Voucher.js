import apiVoucher from 'services/voucher';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
// import { Description } from './index';
import moment, { now } from 'moment';
import PopupSuccess from '../../App/PopupSuccess';

const Voucher = ({ offer }) => {
  const navigate = useNavigate();

  const voucherRef = useRef();
  const [voucher, setVoucher] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [loadingPopup, setLoadingPopup] = useState(false);
  const [totalDay, setTotalDay] = useState(0);
  const [showTime, setShowTime] = useState(null);

  useEffect(() => {
    getVoucher();
    handleTime();
  }, []);

  const handleVoucher = () => {
    setLoading(true);
    apiVoucher.getCode(voucher.id).then(({data}) =>{
      setVoucher({...voucher, vouchers: [data]})
      setMessage('Lấy mã thành công');
      setLoadingPopup(true);
      setTimeout(() =>
          navigate(`../../offer-qrcode/${voucher.vouchers[0].voucherCode}`),
        2400);
    }).catch(({response}) => {
      setMessage(response.data.message);
      setLoadingPopup(true);
    }).finally(() => setLoading(false));
  }

  const handleTime = time => {
    const endDate = moment(time);
    const result = endDate.diff(moment(), 'days');

    if (result === 0){
      const hour = endDate.diff(moment(), 'hours');
      const minute = endDate.diff(moment(), 'minutes')%60;
      setShowTime(`${hour < 10 ? '0'+hour : hour}h${minute < 10 ? '0'+minute : minute}p`);
    }else {
      setShowTime(`${result} ngày`);
      setTotalDay(result);
    }
  }

  const getVoucher = () => {
    apiVoucher.getVoucherByOfferId(offer.id).then(({data}) => {
      setVoucher(data);
      handleTime(data.voucherExpiredDate);
    });
  }

  const redirectQrCode = () =>
    navigate(`../../offer-qrcode/${voucher.vouchers[0].voucherCode}`);

  return (
    <>
      {/*Lay ma*/}
      {
        voucher &&
        <div className='w-full'>
          <div className="mb-8" >
            <div className={classNames('flex')} >
              <div className='w-9/12'>
                {
                  voucher?.status === 'ACTIVE' &&
                  <>
                    {
                      voucher?.campaignType === 'LIMITED' &&
                      <span className='bg-amber-300 pl-2 pr-2 pt-1 pb-1 w-auto text-base relative top-3 left-4'>
                      {
                        (voucher?.totalVoucherActivate === 0 && !voucher.vouchers) ?
                          <span className='text-neutral-500'>Đã hết lượt</span> :
                          <b className='font-bold text-red-600'>Số lượng có hạn</b>
                      }
                    </span>
                    }
                  </>
                }
              </div>
              {/*<div className='w-3/12 '>*/}
              {/*  <div className={classNames('w-5 h-5 bg-white rounded-full relative right-2.5', {*/}
              {/*    'top-7' : voucher?.campaignType === 'LIMITED',*/}
              {/*    'top-2' : voucher?.campaignType !== 'LIMITED'*/}
              {/*  })}></div>*/}
              {/*</div>*/}
            </div>
            <div className={classNames('flex')} style={{background: '#FFEEC2'}} ref={voucherRef}>
              <div className={classNames( 'w-9/12 flex p-4 ',
                {
                  'opacity-50': (!((voucher?.campaignType === 'LIMITED' && voucher?.totalVoucherActivate != 0) ||
                    voucher?.campaignType === 'UNLIMITED')) && !voucher.vouchers
                })}>
                <div className='w-11/12 flex flex-col '>
                  <div className='text-xl ellipse-2-line font-bold'>
                    {voucher?.voucherTitle}
                  </div>
                  <div className='text-base pr-2 mt-3'>
                    {
                      totalDay > 10 ?
                        <div className='rounded-full'>
                          HSD:&nbsp;{ moment(voucher.voucherExpiredDate).format('DD/MM/YYYY') }
                        </div> :
                        // text-gray-500
                        <span className={classNames('rounded-full pl-3 pr-3 pb-1 bg-amber-300', {
                          'text-red-500	' : totalDay === 0
                        })} >
                        Hết hạn sau { showTime }
                      </span>
                    }

                  </div>
                </div>

              </div>
              <div className='w-3/12 flex  border-l-2 border-dashed border-slate-400'>
                {/*<img className='h-28' src={voucher.voucherImg} alt='' />*/}
                <div className='flex flex-col justify-between w-full  h-full font-bold text-xl'>
                  <div className='w-5 h-5 rounded-full relative bottom-3 bg-background right-3'></div>
                  <div className='w-full flex justify-center'>
                    {
                      (voucher.vouchers && (voucher.status === 'ACTIVE' || voucher.status === 'INEXPIRED')) ?
                        <span className='text-red-600 ' onClick={redirectQrCode}>Mở</span> :
                        <>
                          {
                            ((voucher?.campaignType === 'LIMITED' && voucher?.totalVoucherActivate != 0) ||
                              voucher?.campaignType === 'UNLIMITED') ?
                              <span onClick={handleVoucher} className='text-red-600'>
                          Lấy mã
                        </span> :
                              <span className='text-neutral-900 '>
                          Lấy mã
                        </span>
                          }
                        </>
                    }
                  </div>
                  <div className='w-5 h-5 bg-background rounded-full relative top-3 right-3'></div>

                </div>
              </div>
            </div>
            {/*  <Description title=''>*/}
            {/*    <b className='text-blue-600 '>Thông tin voucher </b>*/}
            {/*    <div className='mt-2 text-2xl' dangerouslySetInnerHTML={{ __html: voucher?.voucherDesc }}></div>*/}
            {/*  </Description>*/}
          </div>
        </div>
      }
      {/*Lay ma*/}

      <PopupSuccess isLoading={loadingPopup}
                    message={message}
                    closePopup={() => {
                      setLoadingPopup(false);
                      setMessage(null)
                    }}/>
    </>
  )
}

export default Voucher;