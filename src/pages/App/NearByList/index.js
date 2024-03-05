import { useEffect, useState, useRef } from 'react';
import _ from 'lodash';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';
import { handleViews, makeId, useLatLng } from 'systems/utils/functionCommon';
import { Header, Icon, Loading, NoData } from 'components';

const NearByList = ({ loadDataItems, dataSource, loading}) => {
  const navigate = useNavigate();

  useEffect(() => {
    loadDataItems();
  }, []);


  const handleDecodeUrl = offer => {
    const {address, openPopupAddress} = {
      address: '?address=' + encodeURIComponent(offer.address),
      openPopupAddress: offer.addressList && offer.addressList.length > 1 ? '&openPopupAddress=ok': ''
    }

    return address + openPopupAddress;
  }

  const handleUrl = offer =>
    `/offers/${offer.id}?address=${encodeURIComponent(offer.address)}&lat=${offer.latitude}&lng=${offer.longitude}`;


  const handleFormatForward = offer => {
    const forward = Number(offer?.distance)?.toFixed(1);
    return forward < 1 ? forward*1000 + 'm': forward + 'km';
  }

  return (
    <div
      className={classNames('bg-white', {
        layout: 'Ưu đãi quanh bạn',
      })}
    >
      <Header title='Ưu đãi quanh bạn' />
      <div className="p-6 pt-3 overflow-auto" style={{height: 'calc(100vh - 6rem)'}}>
        {loading && (
          <div className="h-full flex justify-center items-center">
            <Loading />
          </div>
        )}
        {!loading && _.isEmpty(dataSource) ? (
          <div className="h-full flex justify-center items-center">
            <NoData />
          </div>
        ) : (
         <>
           {_.map(dataSource, (offer, index) => (
             <div key={makeId(60)+offer.id} className="flex border-b py-5">
               <div
                 onClick={() => navigate(`/offers/${offer.id}`)}
                 className="bg-no-repeat bg-cover bg-slate-100 overflow-hidden flex items-center w-1/3 h-32">
                 <img src={offer.thumbnailUrl} alt="offer-thumbnail" />
               </div>

               <div className="flex flex-col justify-between flex-1 ">
                 <div className='w-full flex justify-between flex-1 '>
                   <div className='flex flex-col pl-4 justify-between w-9/12'
                        onClick={() => navigate(handleUrl(offer))}>
                     {/*<div className="text-xl text-txt-20 leading-4 text-1-row">{offer.ownerName}</div>*/}
                     <div className="text-xl  ellipse-2-line h-14">{offer.title}</div>
                     <div className="text-base text-txt-20 leading-4 mt-2">
                       {moment(offer.startDate).format('DD/MM/YYYY')} -{' '}
                       {moment(offer.expiredDate).format('DD/MM/YYYY')}
                     </div>
                   </div>

                   <div className=' w-3/12 flex flex-col items-center justify-between'>
                     <div className='flex custom-icon-eye relative left-3' >
                       <Icon type='icon-eye' />
                       <span className='text-base'>&nbsp;{handleViews(offer.view)}</span>
                     </div>
                   </div>
                 </div>

                 <div className='mt-2 pl-4 flex justify-between'>
                   <Link to={`/offers/${offer.id}${handleDecodeUrl(offer)}`}>
                     <span className="flex items-center text-icon-20 text-base  font-semibold">
                      {
                        offer.addressList && offer.addressList.length > 1 ?
                          `Xem thêm ${offer.addressList.length} chi nhánh`: `Xem chi tiết`
                      }
                       <Icon type="chevron-right-circle" className="pl-3" />
                    </span>
                   </Link>
                   <div
                       className={classNames('rounded-3xl text-white font-medium text-base px-5 py-1', {
                         'bg-A1-40': offer.distance < 5,
                         'bg-A1-50': offer.distance >= 5 && offer.distance < 10,
                         'bg-A1-30': offer.distance > 10,
                       })}
                     >
                       {handleFormatForward(offer)}
                     </div>
                   </div>

               </div>
             </div>
           ))}
         </>
        )}
      </div>
    </div>
  );
};

export default NearByList;
