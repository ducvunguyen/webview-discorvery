import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const Tab = ({ nameTabs, active, onChange}) => {
  const [tabActive, setTabActive] = useState(active);
  // console.log(headerContainerPosition);
  const handleChangeTab = tab => {
    if(tab === tabActive) return;
    setTabActive(tab);
    onChange(tab)
  }

  return (
    <div className={classNames('flex')}>
      {nameTabs.map((tab, index) =>
        <div className='pl-5 pr-5' key={'tab' + index}>
          <div
            onClick={() => handleChangeTab(tab.key)}
            className={classNames('bg-white text-txt-40 text-xl border rounded-full p-3', {
              'text-blue-400 border-blue-400': tab.key === tabActive
            })}>
            {tab?.name}
          </div>
        </div>
      )}
    </div>
  )
}

export default Tab;

Tab.prototype = {
  nameTabs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    key: PropTypes.string
  })),
  active: PropTypes.string,
  onChange: PropTypes.func
}