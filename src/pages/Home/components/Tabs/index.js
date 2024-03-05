import { useState } from 'react';
import classNames from 'classnames';

const Tabs = ({active, onChange}) => {
  const [tabActive, setTabActive] = useState(active);

  const handleChangeTab = tab => {
    if(tab === tabActive) return;
    setTabActive(tab);
    onChange(tab)
  }
  return (
    <div className='mt-8'>
      <div className='w-full flex border-b-2	'>
        {
          tabs.map(tab => (
            <div key={tab.key} className={classNames('pt-3 pb-3 w-6/12', {
              'border-b-2	border-blue-600': tabActive === tab.key
            })}>
              <div
                onClick={() => handleChangeTab(tab.key)}
                className={classNames('text-center text-txt-40 p-2 text-xl', {
                  'bg-white font-bold border rounded-full text-primary border-blue-600' : tabActive === tab.key,
                  'font-medium': !tabActive === tab.key
                })}>
                {/*<Icon type={tab.icon} />*/}
                {tab.name}</div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Tabs;

const tabs = [
  {
    name: 'Khuyến mại',
    key: 'updatedDate,desc',
    icon: 'favorite-fill'
  },
  {
    name: 'Dành cho bạn',
    key: 'view,desc',
    icon: 'icon-you'
  }
]