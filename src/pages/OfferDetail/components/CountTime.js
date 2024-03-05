import { useState, useEffect, useRef } from 'react';
import moment from 'moment';

const convertRemainTime = (time) => {
  if (time < 0) return '00';
  return time < 10 ? `0${time}` : time.toString();
};

const CountDown = ({ startDate, expiredDate }) => {
  if (moment().isBefore(startDate) || moment(expiredDate).diff(moment()) > 30 * 86400000) {
    return null;
  }
  const [countDown, setCountDown] = useState();
  const _intervalRef = useRef();

  useEffect(() => {
    setCountDown(moment(expiredDate).diff(moment()));
  }, [expiredDate]);

  useEffect(() => {
    if (countDown === 0) {
      clearInterval(_intervalRef.current);
    }
    _intervalRef.current = setInterval(() => {
      setCountDown((countDown) => countDown - 1000);
    }, 1000);

    return () => clearInterval(_intervalRef.current);
  }, [countDown]);

  const renderTime = (type) => {
    const duration = moment.duration(countDown);
    const remainTime = convertRemainTime(Math.floor(duration[type]()));
    const timeUnit = type === 'asDays' ? 'Ngày' : type === 'hours' ? 'Giờ' : 'Phút';

    return (
      <div className="flex flex-col justify-around items-center">
        <div
          className="flex justify-around items-center text-5xl text-white font-thin"
          style={{ fontFamily: "'Teko', sans-serif" }}
        >
          <div className="flex justify-around items-center rounded-lg bg-A1-30 w-10 h-15 px-3 pt-2 pb-1 mr-1">
            {remainTime.charAt(0)}
          </div>
          <div className="flex justify-around items-center rounded-md bg-A1-30 w-10 h-15 px-3 pt-2 pb-1">
            {remainTime.charAt(1)}
          </div>
        </div>
        <div className="text-2xl mt-4">{timeUnit}</div>
      </div>
    );
  };

  if (countDown === 0) return null;

  return (
    <div className="bg-white p-6 mb-8">
      <div className="text-txt-30 text-3xl font-semibold border-b pb-4">Thời gian còn lại</div>
      <div className="flex justify-around items-center pt-6 px-10">
        {renderTime('asDays')}
        <div className="text-5xl pb-14">:</div>
        {renderTime('hours')}
        <div className="text-5xl pb-14">:</div>
        {renderTime('minutes')}
      </div>
    </div>
  );
};

export default CountDown;
