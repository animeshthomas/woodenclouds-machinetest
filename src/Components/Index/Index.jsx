import React, { useEffect, useState } from "react";
import productsData from '../../Data/products2.json'; 
import productsImage from '../../Data/image.png';
import { Dropdown, Button, Form, Table } from 'react-bootstrap';

const Index = () => {
  // State to hold products
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Products</h1>
        <Button variant="primary">+ Add Products</Button>
      </div>
      
      <div className="row">
        <div className="col-md-12">
          <Table striped hover>
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
            <p>Showing 1 to 5 of 710 entries</p>
            <nav>
              <ul className="pagination">
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">4</a></li>
                <li className="page-item"><a className="page-link" href="#">5</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
