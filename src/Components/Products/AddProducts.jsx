import React from 'react';
import { useLocation } from 'react-router-dom';

const AddProducts = () => {
  const location = useLocation();
  const { category1, category2, category3, category4 } = location.state || {};

  return (
    <div className="container-fluid">
      <h1>Add Products</h1>
      <p>Category 1: {category1}</p>
      <p>Category 2: {category2}</p>
      <p>Category 3: {category3}</p>
      <p>Category 4: {category4}</p>
    </div>
  );
};

export default AddProducts;
