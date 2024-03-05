import api from 'services/category';
import useQuery from './useQuery';
import { updateCategories } from 'redux/slices/categoriesSlice';

const useCategory = (
  params = {
    page: 0,
    pageSize: 100,
  }
) => {
  const { data: categories } = useQuery({
    queryKey: 'categories',
    queryFn: () => api.getCategories(params).then(({ data }) => {
      data?.categories?.forEach(item => !item.sequence ? item.sequence = 999 : null);
      return data?.categories?.sort((a, b) => Number(a.sequence) - Number(b.sequence));
    }),
    reduxAction: updateCategories,
  });

  return categories;
};

export default useCategory;
