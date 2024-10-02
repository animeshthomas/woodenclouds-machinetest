import React, { useEffect, useState } from "react";
import productsData from '../../Data/products2.json'; 
import productsImage from '../../Data/image.png';
import { Dropdown, Button, Form, Table, Pagination } from 'react-bootstrap';

const Index = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setProducts(productsData);
  }, []);

  // Calculate current products to display
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Products</h1>
        <Button variant="primary" className="btn-add-product">+ Add Products</Button>
      </div>
      
      <div className="row">
        <div className="col-md-12">
          <Table striped hover className="product-table">
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
              {currentProducts.map((product, index) => (
                <tr key={product.id}>
                  <td>{String(indexOfFirstProduct + index + 1).padStart(2, '0')}</td>
                  <td>
                    <img
                      src={productsImage} 
                      alt={product.productName}
                      className="img-thumbnail"
                      width="50"
                      height="50"
                    />
                  </td>
                  <td>{product.productName}</td>
                  <td>{product.product}</td>
                  <td>{product.createdBy}</td>
                  <td>{product.createdDate}</td>
                  <td>
                    <Form.Check 
                      type="switch" 
                      id={`status-switch-${product.id}`} 
                      label=""
                      defaultChecked={product.status === "Active"} 
                    />
                  </td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="light" id="dropdown-basic">
                        <i className="bi bi-three-dots-vertical"></i>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/view">View</Dropdown.Item>
                        <Dropdown.Item href="#/edit">Edit</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          
          {/* Pagination Section */}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <p>Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, products.length)} of {products.length} entries</p>
            <Pagination>
              {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item 
                  key={i} 
                  active={i + 1 === currentPage} 
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
