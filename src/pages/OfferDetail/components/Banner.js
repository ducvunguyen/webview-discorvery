import React from 'react';

const Banner = ({ bannerUrl, openViewBanner }) => {
  return (
    <div className="h-80 bg-cover bg-no-repeat"
         style={{ backgroundImage: `url(${bannerUrl})` }}
         onClick={openViewBanner}>
    </div>
  );
};

export default Banner;
