import { Icon } from 'components';
// import { GifVoucher } from 'resources/images';
import classNames from 'classnames';
import { PUBLIC_URL } from 'config/constants';

const PopupDetailVoucher = ({voucher, onClose}) => {
  const body = document.body;
  body.style.overflowY = 'hidden';
  const handleClose = () => {
    body.style.overflowY = 'auto'
    onClose();
  }
  return (
    <div className='z-20 w-full fixed top-0 left-0 h-full overflow-auto ' style={{background: '#EFEEF3'}}>
      <div className="flex-col justify-between items-center flex h-full">
        <div className="w-full">
          <div className='w-full'>
            <div className={classNames('w-full h-96 bg-no-repeat p-4', {
              'bg-cover' : voucher?.voucherCampaignDTO.voucherImg,
              'bg-contain' : !voucher?.voucherCampaignDTO.voucherImg
            })}
                 style={{backgroundImage: `url(${voucher?.voucherCampaignDTO.voucherImg || PUBLIC_URL + 'images/gif_voucher.png'})`}}>
        <span className='color-icon-white' onClick={handleClose}>
          <Icon type='icon-x-mark-solid' className="h-6 w-6" />
        </span>
            </div>
            <div className='w-full flex justify-center'>
              <div className='flex bg-slate-50 flex-col items-center p-4 w-11/12 shadow-inner rounded-xl relative bottom-5'>
                <div className='font-bold text-3xl text-gray-700 text-center'>
                  {voucher?.voucherCampaignDTO.voucherTitle}
                </div>
                {
                  voucher.isExpiry ?
                    <div className='text-2xl mt-3 text-slate-600'>
                      Hạn sử dụng : {voucher?.expiry}
                    </div> :
                    <div className='text-2xl mt-3 text-red-300'>
                      Đã hết hạn sử dụng
                    </div>
                }
              </div>
            </div>
          </div>

          <div className='w-full mt-4 flex justify-center'>
            <hr className='w-11/12 border-gray-300 border-t	'/>
          </div>

          {voucher?.voucherCampaignDTO.voucherDesc &&
            <div className='w-full  flex justify-center'>
              <div className=' w-11/12 p-4'>
                <div className='font-bold text-gray-700'>Hướng dẫn dùng</div>
                <div className='break-words text-slate-600' dangerouslySetInnerHTML={{__html: voucher?.voucherCampaignDTO.voucherDesc.replaceAll('\n', '<br/>')}}>
                </div>
              </div>
            </div>
          }
        </div>

        <div className='w-full  flex justify-center'>
          <div className=' w-11/12 p-4'>
            <button className="w-full h-20 bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded" onClick={handleClose}>
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopupDetailVoucher