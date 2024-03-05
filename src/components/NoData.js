// import { NoData as NoDataImg } from 'resources/images';
import { PUBLIC_URL } from '../config/constants';

const NoData = () => {
  return (
    <div
      className="flex flex-col justify-center items-center w-full -mt-8 flex-1"
      style={{ height: 'calc(100vh - 7rem)' }}
    >
      <img src={PUBLIC_URL + 'images/NoData.png'} alt="no-data" />
      <div className="mt-10 text-3xl text-txt-50 font-semibold">Chưa có dữ liệu hiển thị</div>
      <div className="mt-5 text-center text-2xl text-txt-10">
        Hiện tại chưa có dữ liệu cho phần này
        <br /> vui lòng thử lại sau bạn nhé...
      </div>
    </div>
  );
};
export default NoData;
