import React from "react";

import "./Category.css";

const Category = ({ tab, setTab }) => {
  return (
    <div className="category">
      <ul className="category__container">
        <li className={tab === 0 ? "active" : null} onClick={() => setTab(0)}>
          ocean view
        </li>
        <li className={tab === 1 ? "active" : null} onClick={() => setTab(1)}>
          city view
        </li>
        <li className={tab === 2 ? "active" : null} onClick={() => setTab(2)}>
          mountain view
        </li>
      </ul>
    </div>
  );
};

export default Category;
