import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

const useQuery = ({ queryKey, queryFn, reduxAction, depend }) => {
  const dispatch = useDispatch();
  const dataQuery = useSelector((state) => state[queryKey]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const callApi = async () => {
      setIsLoading(true);
      try {
        const data = await queryFn();
        dispatch(reduxAction(data));
        setIsSuccess(true);
      } catch (error) {
        setIsError(true);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (!(depend !== undefined && _.isEmpty(depend))) {
      callApi();
    }
  }, [depend]);

  return { isLoading, isSuccess, isError, error, data: dataQuery };
};

export default useQuery;
