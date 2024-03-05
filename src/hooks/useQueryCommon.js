import {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'

const useQueryCommon = ({queryKey, queryFn, reduxAction}) => {
  const data = useSelector((state) => state[queryKey]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data || data.length === 0){
      queryFn().then(dataResponse => dispatch(reduxAction(dataResponse)));
    }
  }, []);

  return data;
}

export default useQueryCommon;