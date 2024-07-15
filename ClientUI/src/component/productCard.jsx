import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '300px' }}>
      <h3>{product.name}</h3>
      <p>Company: {product.company}</p>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}</p>
      <p>Discount: {product.discount}%</p>
      <p>Availability: {product.availability}</p>
    </div>
  );
};

export default ProductCard;
