import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { login } from 'services/auth';
import { Auth } from 'systems/api';
import useLoginToken from './useLoginToken';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const {updateToken} = useLoginToken();

  useEffect(() => {
    const appToken = Object.fromEntries([...searchParams]).loginToken;
    if (appToken) {
      setLoading(true);
      updateToken(true);
      login(appToken)
        .then(({ data }) => {
          const { token } = data;
          if (token) {
            Auth.setToken(data.token);
            Auth.setRefreshToken(data.refreshToken);
            setIsAuth(true);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);
  const [isAuth, setIsAuth] = useState(false);
  const [searchParams] = useSearchParams();

  const location = useLocation();

  return { loading, isAuth };
};

export default useAuth;
