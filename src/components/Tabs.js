import React, { useState } from 'react';
import classNames from 'classnames';

const TabPane = (props) => <>{props.children}</>;

const Tabs = ({ defaultActiveTab = '1', children: tabsChildren, onChange = () => {} }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const handleChangeActiveTab = (key) => {
    setActiveTab(key);
    onChange(key);
  };

  let content;
  const tabs = React.Children.map(tabsChildren, (child) => {
    const { tabKey, label, children } = child.props;
    if (tabKey === activeTab) content = children;

    return (
      <div
        key={tabKey}
        className={classNames(
          'flex justify-center items-center h-full w-full text-2xl bg-white py-3 border-b-2',
          {
            'border-primary text-primary font-semibold': activeTab === tabKey,
            'border-white text-txt-10': activeTab !== tabKey,
          }
        )}
        onClick={() => handleChangeActiveTab(tabKey)}
      >
        {label}
      </div>
    );
  });

  return (
    <>
      <div
        className="grid w-full overflow-hidden mb-2"
        style={{
          boxShadow:
            '0px 2px 4px rgba(35, 87, 234, 0.06), 0px 3px 4px rgba(35, 87, 234, 0.06), 0px 1px 5px rgba(35, 87, 234, 0.07)',
          gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`,
        }}
      >
        {tabs}
      </div>
      <div>{content}</div>
    </>
  );
};

Tabs.TabPane = TabPane;

export default Tabs;
