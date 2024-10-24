import React from 'react';

const TabMenu = ({ tabs, onSelect }) => {
  return (
    <ul className="nav nav-tabs">
      {tabs.map(tab => (
        <li className="nav-item" key={tab.id}>
          <a className="nav-link" onClick={() => onSelect(tab.id)}>
            {tab.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default TabMenu;
