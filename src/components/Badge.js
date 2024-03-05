import React from "react";
import classNames from 'classnames';

const Badge = ({ children, amount, position = 'top-right' }) => {
  return (
    <div className="relative">
      {amount > 0 && (
        <div
          className={classNames(
            'bg-A1-60 h-6 absolute text-white flex items-center justify-center text-base font-normal',
            {
              '-top-2 -right-2': position === 'top-right',
              '-bottom-2 -right-2': position === 'bottom-right',
              '-bottom-2 -left-2': position === 'bottom-left',
              '-top-2 -left-2': position === 'top-left',
              'w-6 rounded-full': amount.toString().length === 1,
              'w-7 rounded-full': amount.toString().length === 2,
              'w-9 rounded-2xl ': amount.toString().length > 2,
            }
          )}
        >
          {amount > 99 ? '99+' : amount}
        </div>
      )}
      {children}
    </div>
  );
};

export default Badge;