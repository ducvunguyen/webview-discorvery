import { useRef, useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from "react-router-dom";
import _ from 'lodash';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';

import { Header, Loading, NoData } from 'components';
import PopupDetailVoucher from './components/PopupDetailVoucher';
import { PUBLIC_URL } from 'config/constants';

const VoucherList = ({
    title,
    vouchers,
    loading,
    page,
    hasMore,
    fetchVoucherOwner,
  }) => {
  const navigate = useNavigate();

  const _scrollParentRef = useRef();
  const [infoVoucher, setInfoVoucher] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);

  const handleCheckExpiredDate = voucherExpiredDate => {
    if (!voucherExpiredDate) return false;
    return moment().isBefore(voucherExpiredDate);
  }

  const handleTime = time => {
    if (!time) return '';

    const endDate = moment(time);
    const totalDay = endDate.diff(moment(), 'days');
    let showTime = '';

    if (totalDay === 0){
      const hour = endDate.diff(moment(), 'hours');
      const minute = endDate.diff(moment(), 'minutes')%60;
      showTime = `${hour < 10 ? '0'+hour : hour}h${minute < 10 ? '0'+minute : minute}p`;
    }
    else if (totalDay > 10 || totalDay < 0)
      showTime = endDate.format('DD/MM/YYYY');
    else
      showTime = `${totalDay} ngày`;

    return showTime;
  }

  function handleCondition(voucher) {
    const cloneVoucher = {...voucher};
    cloneVoucher.expiry = handleTime(voucher?.voucherCampaignDTO?.voucherExpiredDate);
    cloneVoucher.isExpiry = handleCheckExpiredDate(voucher?.voucherCampaignDTO?.voucherExpiredDate);
    setInfoVoucher(cloneVoucher);
    setOpenPopup(true);
    return undefined;
  }

  return (
    <div
      className={classNames('bg-white', {
        layout: title,
        'overflow-auto' : !openPopup,
        'overflow-hidden' : openPopup
      })}
    >
      {title && <Header title={title} />}
      <div className={classNames('p-6 pt-3 ')}  ref={_scrollParentRef}>
        {loading && (
          <div className="h-full flex justify-center items-center">
            <Loading />
          </div>
        )}
        {!loading && _.isEmpty(vouchers) ? (
          <div className="h-full flex justify-center items-center">
            <NoData />
          </div>
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={() => fetchVoucherOwner(page + 1)}
            hasMore={hasMore && !loading}
            loader={
              <div className="my-2" key={0}>
                <Loading />
              </div>
            }
            useWindow={false}
            getScrollParent={() => _scrollParentRef.current}
            threshold={50}
          >
            {_.map(vouchers, (voucher, index) => (
              <div  className={classNames('w-full', {
                'mt-4' : handleCheckExpiredDate(voucher?.voucherCampaignDTO?.voucherExpiredDate)
              })} key={voucher.id}>
                {
                  !handleCheckExpiredDate(voucher?.voucherCampaignDTO?.voucherExpiredDate) &&
                    <span className='p-1 text-base bg-zinc-200 relative top-3 left-3 font-bold'>
                      Đã hết hạn</span>
                }
                <div style={{background: 'white'}} className={classNames('flex justify-between rounded-xl border-2', {
                  'bg-gray-100' : !handleCheckExpiredDate(voucher?.voucherCampaignDTO?.voucherExpiredDate),
                  'border-gray-200': !handleCheckExpiredDate(voucher?.voucherCampaignDTO?.voucherExpiredDate),
                })}>
                  <div className={classNames('w-3/12 flex rounded-l-xl justify-center items-center h-40 border-r-2 border-dashed')}>
                    <img
                      src={voucher?.logoUrl || PUBLIC_URL + 'images/gif_voucher.png'} alt=''
                      className={classNames('h-24 w-24 object-cover', {
                      'opacity-60' : !handleCheckExpiredDate(voucher?.voucherCampaignDTO?.voucherExpiredDate)
                    })} />
                  </div>

                  <div className="flex flex-col justify-around pt-4 pb-4 text-xl text-txt-20 leading-4 w-7/12 pl-4">
                    <div className={classNames('text-slate-600 text-2xl ellipse-2-line h-16', {
                      'opacity-60': !handleCheckExpiredDate(voucher?.voucherCampaignDTO?.voucherExpiredDate),
                    })}>
                      <b>{voucher?.voucherCampaignDTO.voucherTitle}</b>
                    </div>
                    <div className='text-slate-500'>
                      <div className={classNames('text-lg mt-1 font-semibold', {
                        'opacity-60': !handleCheckExpiredDate(voucher?.voucherCampaignDTO?.voucherExpiredDate),
                      })}>
                        HSD: {handleTime(voucher?.voucherCampaignDTO?.voucherExpiredDate)}
                      </div>
                      <div
                        onClick={() => handleCondition(voucher)}
                        className={classNames('text-xl text-red-500', {
                        'opacity-60': !handleCheckExpiredDate(voucher?.voucherCampaignDTO?.voucherExpiredDate),
                      })}>
                        Điều kiện
                      </div>
                    </div>
                  </div>

                  <div className={classNames('flex flex-col justify-end h-auto w-2/12 text-red-400', {
                    'opacity-60': !handleCheckExpiredDate(voucher?.voucherCampaignDTO?.voucherExpiredDate),
                  })}>
                    {
                        <span className=' mb-5 font-bold text-xl'
                              onClick={() => navigate(`../offer-qrcode/${voucher.voucherCode}`)}>Mở</span>
                    }
                  </div>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        )}
      </div>
      {openPopup &&
        <PopupDetailVoucher
          voucher={infoVoucher}
          onClose={() => setOpenPopup(false)} />
      }
    </div>
  );
}

export default VoucherList