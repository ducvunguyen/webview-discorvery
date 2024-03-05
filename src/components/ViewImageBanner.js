import classNames from 'classnames';
import { Icon } from 'components/index';

const ViewImageBanner = ({image, isOpen, onClose}) => {
  if (!isOpen)
    return null;

  return (
    <>
      <div className=' w-full h-full bg-white z-20 fixed top-0'
         >
        <div
          className={classNames('rounded-full fixed text-3xl pt-6 pl-3')}
        >
          <div onClick={onClose} className='rounded-full w-14 h-14 flex justify-center items-center bg-slate-300'>
            <Icon type="icon-x-mark-solid" className="w-4 color-icon-white" />
          </div>
        </div>
        <div className='w-full h-full flex justify-center items-center'>
          <img src={image} alt='' className='h-full object-contain box-scale-view-image'/>
        </div>
      </div>
    </>
  )
}

export default ViewImageBanner;