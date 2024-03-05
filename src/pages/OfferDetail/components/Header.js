import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Icon } from 'components';
import api from 'services/offer';
import { postMessageToApp } from 'systems/utils/helper';
import { NATIVE_ACTION } from 'config/constants';
import useQueryParamURL from 'hooks/useQueryParamURL';
import useLoginToken from 'hooks/useLoginToken';
import useUserLocation from 'hooks/useUserLocation';

const Header = ({ offer, setOffer, headerContainerPosition }) => {
  useUserLocation();

  const navigate = useNavigate();
  const loginToken = useQueryParamURL().get('loginToken');
  const share = useQueryParamURL().get('share');
  const {isLoginToken} = useLoginToken();

  const handleGoBack = () =>
    loginToken ? postMessageToApp({ type: NATIVE_ACTION.CLOSE_APP }) : navigate(share ? '/' : -1);

  const handleReactOffer = async () => {
    const { id, liked } = offer;
    try {
      await api.reactOffer({
        id,
        type: liked ? 'NONE' : 'LIKE',
      });

      setOffer({ ...offer, liked: !liked });
    } catch (error) {
      console.log(error);
    }
  };

  // const handleShare = () => {
  //   postMessageToApp({
  //     type: NATIVE_ACTION.SHARE_FACEBOOK, // type SHARE_FACEBOOK
  //     url: window.location.href, //url share
  //     title: offer?.title, //tiêu đề
  //     image: offer.bannerUrl, // ảnh
  //     description: offer?.description, // một text chứa html,
  //     offerId: offer?.id
  //   });
  // }

  // const feedFacebook = () => {
  //   window?.FB?.ui({
  //     display: 'popup',
  //     method: 'share',
  //     href: window.location.href,
  //   }, function(response){
  //     console.log(response);
  //   });
  // }

  const bgOpacity = (headerContainerPosition * -1) / 85;

  return (
    <div
      className="flex justify-between items-center fixed z-10 top-0 w-full px-6"
      style={{
        backgroundColor: `rgba(20, 30, 210, ${bgOpacity})`,
        minHeight: 60,
        height: 85 - bgOpacity * 15, // defaultHeight - paddingY
      }}
    >
      <div
        style={{boxShadow: bgOpacity === 0 ? 'rgb(0 0 0 / 11%) 0px 0px 4px' : 'none'}}
        className={classNames('flex justify-center items-center rounded-full w-14 h-14 text-3xl', {
          'bg-white text-icon-40': bgOpacity === 0,
          'text-white': bgOpacity !== 0,
        })}
        onClick={handleGoBack}
      >
        <Icon type="chevron-left" className="pr-1" />
      </div>

      <div className="text-1-row text-center text-3xl font-semibold text-white" style={{ opacity: bgOpacity, width: '70%' }}>
        {offer.ownerName}
      </div>
      {
        isLoginToken ?
        <div
          style={{boxShadow: bgOpacity === 0 ? 'rgb(0 0 0 / 11%) 0px 0px 4px' : 'none'}}
          className={classNames(
            'flex justify-center items-center rounded-full w-14 h-14 text-4xl',
            {
              'text-icon-60': offer.liked,
              'bg-white': bgOpacity === 0,
              'text-white': bgOpacity !== 0,
              'text-icon-50': bgOpacity == 0 && !offer.liked,
            }
          )}
          onClick={handleReactOffer}
        >
          <Icon  type={offer.liked ? 'favorite-fill' : 'favorite'} />
        </div> :
        <div></div>
      }

      {/*<div*/}
      {/*  style={{boxShadow: bgOpacity === 0 ? 'rgb(0 0 0 / 11%) 0px 0px 4px' : 'none'}}*/}
      {/*  className={classNames('flex justify-center items-center rounded-full w-14 ml-2 h-14 text-3xl', {*/}
      {/*    'bg-white text-icon-40': bgOpacity === 0,*/}
      {/*    'text-white': bgOpacity !== 0,*/}
      {/*  })}*/}
      {/*  onClick={handleShare}*/}
      {/*>*/}
      {/*  <Icon  type='icon-share' />*/}
      {/*</div>*/}
    </div>
  );
};

export default Header;
