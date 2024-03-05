import { lazy, Suspense } from 'react';
import { Route, useLocation } from 'react-router-dom';
import { Loading } from 'components';

import SlideRoutes from 'react-slide-routes';

const Home = lazy(() => import('./pages/Home'));
const HotDealList = lazy(() => import('./pages/HotDealList'));
const OfferByCategory = lazy(() => import('./pages/OfferByCategory'));
const OfferDetail = lazy(() => import('./pages/OfferDetail'));
const OfferInMap = lazy(() => import('./pages/OfferInMap'));
const FavoriteOffers = lazy(() => import('./pages/FavoriteOffers'));
const OfferDirection = lazy(() => import('./pages/OfferDirection'));
const OfferRecentlyView = lazy(() => import('./pages/OfferResentView'));
const OfferQrCode = lazy(() => import('./pages/OfferQrCode'));
const NearBy = lazy(() => import('./pages/NearBy'));
const Search = lazy(() => import('./pages/Search'));
const OfferKV = lazy(() => import('./pages/OfferKV'));

const routes = [
  {
    'path': '',
    'element':<Home />,
  },
  {
    path: 'hot-deal',
    element: <HotDealList />,
  },
  {
    path: 'categories/:id/offers',
    element: <OfferByCategory /> ,
  },
  {
    path: 'offers/:id',
    element: <OfferDetail /> ,
  },
  {
    path: 'offers-in-map',
    element: <OfferInMap /> ,
  },
  {
    path: 'favorite-offers',
    element: <FavoriteOffers /> ,
  },
  {
    path: 'search',
    element:<Search />,
  },
  // {
  //   path: 'voucher-code',
  //   element: <OfferVoucherCode />,
  // },
  {
    path: 'offer-direction',
    element: <OfferDirection /> ,
  },
  {
    path: 'offer-recently-view',
    element: <OfferRecentlyView />,
  },
  {
    path: 'offer-qrcode/:code',
    element: <OfferQrCode />
  },
  {
    path: 'offer-nearby',
    element: <NearBy />
  },
  {
    path: 'offer-kv',
    element: <OfferKV />
  }
];

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SlideRoutes duration={300}>
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </SlideRoutes>
    </Suspense>
  );
};

export default AppRoutes;
