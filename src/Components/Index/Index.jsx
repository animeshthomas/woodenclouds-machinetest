import React, { useEffect, useState } from "react";
import productsData from '../../Data/products2.json'; 
import productsImage from '../../Data/image.png';

const Index = () => {
  // State to hold products
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  return (
    <div className="container-fluid">
      <h1>Products</h1>
      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Images</th>
                <th>Product Name</th>
                <th>Product</th>
                <th>Created by</th>
                <th>Created date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <td>{String(index + 1).padStart(2, '0')}</td>
                  <td>
                    <img
                      src={productsImage} 
                      alt={product.productName}
                      className="img-thumbnail"
                      width="50"
                    />
                  </td>
                  <td>{product.productName}</td>
                  <td>{product.product}</td>
                  <td>{product.createdBy}</td>
                  <td>{product.createdDate}</td>
                  <td>
                    <span className={`badge ${product.status === "Active" ? "bg-success" : "bg-danger"}`}>
                      {product.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-primary btn-sm">View</button>
                    &nbsp;
                    <button className="btn btn-secondary btn-sm">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Index;
