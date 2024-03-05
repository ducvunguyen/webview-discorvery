import { useSelector, useDispatch } from 'react-redux'
import { updateLoginToken } from 'redux/slices/loginTokenSlice';

const useLoginToken = () => {
  const { isLoginToken } = useSelector((state) => state.loginToken);
  const dispatch = useDispatch();

  return {
    isLoginToken,
    publicUrl: isLoginToken ? '' : '/public',
    updateToken :(isCheck) => dispatch(updateLoginToken(isCheck))
  }
}

export default useLoginToken;