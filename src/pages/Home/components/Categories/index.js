import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Icon } from 'components';
import Skeleton from './Skeleton';
import useCategory from 'hooks/useCategory';

const Categories = () => {
  const [expand, setExpand] = useState(false);
  const _categoriesRef = useRef();
  const categories = useCategory();

  const handleChangeExpand = () => setExpand(!expand);

  return (
    <Skeleton loading={_.isEmpty(categories)}>
      <div
        className="overflow-hidden modal-open"
        style={{ height: expand ? _categoriesRef.current.clientHeight : '8.5rem' }}
      >
        <div className="grid grid-cols-4" ref={_categoriesRef}>
          {_.map(categories, (category) => (
            <Link to={`/categories/${category.id}/offers`} key={category.id}>
              <div
                className="flex flex-col justify-center items-center mb-6 cursor-pointer"
                key={category.id}
              >
                <div
                  className="bg-white rounded-md flex justify-center items-center p-2"
                  style={{ width: '4.8rem', height: '4.8rem' }}
                >
                  <img src={category.logoUrl} alt="category-icon" />
                </div>
                <div className="mt-2 text-primary text-2xl">{category.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {categories?.length > 4 && (
        <div
          className="flex justify-center items-center font-semibold text-primary text-2xl"
          onClick={handleChangeExpand}
        >
          {expand ? (
            <>
              Ẩn bớt <Icon type="chevron-up-thin" className="pl-3" />
            </>
          ) : (
            <>
              Xem thêm <Icon type="chevron-down-thin" className="pl-3" />
            </>
          )}
        </div>
      )}
    </Skeleton>
  );
};

export default Categories;
