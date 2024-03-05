import { Icon } from 'components';
import { useState, useLayoutEffect, useRef, useEffect, createElement } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import { handlePostMessageToApp, makeId, numberFormat, openGoogleMap, useLatLng } from 'systems/utils/functionCommon';
import useLoginToken from 'hooks/useLoginToken';
import { NATIVE_ACTION } from 'config/constants';

const ListAddressStore = ({addressList, isOpen, onClose, title, offer}) => {
  if (!isOpen) return null;
  const latLng = useLatLng();
  const {isLoginToken} = useLoginToken();

  const _descriptionRef = useRef();
  const _popupRef = useRef();

  const [address, setAddress] = useState([]);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    handleMathAddress();
  }, []);

  useEffect(() => {
    if (_descriptionRef.current?.clientHeight > 100) {
      setHeight(_descriptionRef.current?.clientHeight);
    }
  }, [address]);

  const handleMathAddress = () => {
    const cloneAddress = [...addressList];
    if (latLng){
      const latUserRadians = degreesToRadians(latLng[0]);
      const lngUserRadians = degreesToRadians(latLng[1]);
      cloneAddress.forEach(item => {
        if (item.latitude && item.longitude && item.latitude != '' && item.longitude != ''){
          const latToRadians = degreesToRadians(item.latitude);
          const lngToRadians = degreesToRadians(item.longitude);
          const diffLatRadians = latToRadians - latUserRadians;
          const diffLngRadians = lngToRadians - lngUserRadians;
          const result = Math.pow(Math.sin(diffLatRadians/2),2) + Math.cos(latUserRadians) * Math.cos(latToRadians) * Math.pow(Math.sin(diffLngRadians/2),2);
          item.forwardSort = Number(result);
          item.forwardMet = numberFormat(3936* (2 * Math.asin(Math.sqrt(result))), 1); //for miles
          item.forwardKiloMet = Number(numberFormat(6378.8 * (2 * Math.asin(Math.sqrt(result))), 1).split(',').join('')); //for kilometers
          item.time = Math.round(((6378.8 * (2 * Math.asin(Math.sqrt(result))))/20)*60);
        }
        // console.log(item.forwardKiloMet);
      });
    }

    cloneAddress.sort((a, b) => a.forwardSort - b.forwardSort);
    setAddress(cloneAddress);
  }

  function degreesToRadians(degrees) {
    const pi = Math.PI;
    return degrees * (pi/180);
  }

  const handleClickPhone = phoneNumber => {
    if (phoneNumber){
      if (isLoginToken)
        handlePostMessageToApp(NATIVE_ACTION.TEL, phoneNumber);
      else{
       const link = createElement(
         'a',
         {
           href: `tel:${phoneNumber}`,
           type: 'tel'
         }
       )
        ReactDOM.render(link, document.getElementById('root'));

        return document.createElement('a').setAttribute('telephone', phoneNumber)
      }
    }
  }

  window.onclick = event => event.target == _popupRef.current ? onClose() : null;

  const handleTime = time => {
    if (!time) return null;

    const surplus = Number(time)%60;
    const division = Number(time)/60;
    const hours = String(division).split('.')[0];
    let days = 0
    if (hours > 24)
      days = hours%24 != 0 ? `${String(hours/24).split('.')[0]} ngày ${ hours%24 } giờ`
        : `${hours/24} ngày`;

    return time >= 60 ? `${surplus === 0 ? division + 'h'
        : hours > 24 ? days : hours + 'h'+ surplus + 'p'}`
      : `${time} phút`;
  }

  return (
    <div className='w-full h-full flex flex-col justify-end fixed z-20 top-0'
         ref={_popupRef}
         style={{background: 'rgba(0,0,0,0.2)', height: '100vh'}}>
      <div className='w-full modal-open overflow-hidden'
           style={{
             height,
           }}>
        <div className='bg-white' ref={_descriptionRef}>
          <div className="text-2xl rounded-t-md font-semibold px-5 relative ">
            <div className="w-full  flex flex-col items-center justify-center border-b border-dashed h-24" >
              <div style={{background: '#2B2E63'}} className="w-28 h-1 rounded-full" onClick={onClose} />
              <div className="w-full flex items-center justify-between">
                <div className='w-11/12 text-1-row text-2xl font-bold text-center'>{title} </div>
                <div onClick={onClose}
                     className="text-6xl flex items-center font-thin relative bottom-1">✕</div>
              </div>
            </div>
          </div>

          <div className='w-full p-5 overflow-auto' style={{maxHeight: '60vh'}}>
            {
              address.map((item, index) => (
                <div key={makeId(60)} className={classNames('w-full p-4', {
                  'border-b' : address.length - 1 != index
                })}>
                  <div className='flex'>
                    <div className='font-medium pt-1 text-2xl w-8/12 ellipse-2-line'>
                      {item?.storeBranch}
                    </div>
                    <div className="flex justify-around w-4/12">
                    {item.phoneNumber &&
                      (
                        isLoginToken ?
                        <button
                          onClick={() => handleClickPhone(item.phoneNumber)}
                          className="flex text-xl justify-between h-12 items-center ml-2 bg-blue-500 text-white py-2 px-4 rounded-full">
                          <span>Gọi ngay</span>
                          <Icon type="icon-right" className="ml-2"/>
                          {/*<Icon type="icon-right"/>*/}
                        </button> :
                        <a
                          className="flex text-xl justify-between h-12 items-center ml-2 bg-blue-500 text-white py-2 px-4 rounded-full"
                          href={`tel:${item.phoneNumber}`}>Gọi ngay
                        </a>
                      )

                    }
                    </div>
                  </div>
                  <div className='w-full justify-between mt-3'>
                    <div className='text-base flex w-8/12'>
                      <div className='flex items-center w-5/12'>
                        <Icon type='icon-clock' />&nbsp;
                        {
                          (item?.time && item?.latitude && item?.longitude && item?.latitude != '' && item?.longitude) ?
                            handleTime(item?.time) : 0
                        }
                      </div>
                      <div className='ml-4 pl-4 border-l flex items-center'>
                        <Icon type='icon-commit'/>&nbsp;
                        {
                          (item?.forwardKiloMet && item?.latitude && item?.longitude && item?.latitude != '' && item?.longitude) ?
                            <>
                              {item?.forwardKiloMet < 1 ? `${item?.forwardKiloMet*1000} m` : `${item?.forwardKiloMet} km`}
                            </> : 0
                        }
                      </div>
                    </div>
                    <div className='flex'>
                      <span className="text-xl">
                       {item.address}
                      </span>

                    </div>
                    {
                      (item.latitude && item.longitude) &&
                      <div className='mt-4'>
                        <button
                          onClick={() => (item.latitude && item.longitude) ? openGoogleMap(latLng, [item.latitude, item.longitude], isLoginToken) : null}
                          className="flex justify-center items-center h-12 text-xl bg-transparent bg-white text-blue-700 font-semibold p-2 border border-blue-500 rounded-full">
                          <Icon type="direction"/>
                          <span className="ml-2">Chỉ đường</span>
                        </button>
                      {/*<span className={classNames({ 'icon-color-disable' : !item.phoneNumber })}*/}
                      {/*      onClick={() => item.phoneNumber ? handleClickPhone(item.phoneNumber) : null}>*/}
                      {/*  <Icon type='icon-telephone' />*/}
                      {/*</span>*/}
                    </div>
                    }
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListAddressStore;
