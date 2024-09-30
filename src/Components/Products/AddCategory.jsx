import React, { useState, useEffect } from 'react';
import { ProgressBar, Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // For navigation

const AddCategory = () => {
  const [categories, setCategories] = useState({
    category1: null,
    category2: null,
    category3: null,
    category4: null,
  });
  
  const [errors, setErrors] = useState({
    category1: false,
    category2: false,
    category3: false,
    category4: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCategories({
      ...categories,
      [e.target.name]: e.target.value
    });

    setErrors({
      ...errors,
      [e.target.name]: false
    });
  };

  const handleSubmit = () => {
    let validationErrors = {};

    // Check if each category is null and set the error state accordingly
    Object.keys(categories).forEach(category => {
      if (!categories[category]) {
        validationErrors[category] = true;
      }
    });

    setErrors(validationErrors);

    // If there are no validation errors, navigate to the next page
    if (Object.keys(validationErrors).length === 0) {
      navigate('/addproducts', { state: categories });
    }
  };

  return (
    <div className="container-fluid">
      <div className="container-fluid p-4">
        {/* Breadcrumb Navigation */}
        <div className="mb-4">
          <h4>Add Products</h4>
          <p className="text-muted">Products / add products</p>
        </div>

        {/* Step Indicator */}
        <div className="d-flex justify-content-end align-items-center mb-4">
          <div className="d-flex align-items-center">
            <span className="step-indicator me-2">1</span>
            <ProgressBar now={50} style={{ width: '50px' }} />
            <span className="step-indicator ms-2 text-muted">2</span>
          </div>
        </div>

        {/* Category Form */}
        <div className="card p-4">
          <h5>Categories</h5>
          <Form>
            {/* Category 1 */}
            <Form.Group as={Row} className="mb-3" controlId="category1">
              <Form.Label column sm={3}>Category 1</Form.Label>
              <Col sm={9}>
                <Form.Select name="category1" onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Toys">Toys</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Accessories">Accessories</option>
                </Form.Select>
                {errors.category1 && <div className="text-danger">You must select a category</div>}
              </Col>
            </Form.Group>

            {/* Category 2 */}
            <Form.Group as={Row} className="mb-3" controlId="category2">
              <Form.Label column sm={3}>Category 2</Form.Label>
              <Col sm={9}>
                <Form.Select name="category2" onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Unisex">Unisex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
                {errors.category2 && <div className="text-danger">You must select a category</div>}
              </Col>
            </Form.Group>

            {/* Category 3 */}
            <Form.Group as={Row} className="mb-3" controlId="category3">
              <Form.Label column sm={3}>Category 3</Form.Label>
              <Col sm={9}>
                <Form.Select name="category3" onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Dolls">Dolls</option>
                  <option value="Action Figures">Action Figures</option>
                  <option value="Educational">Educational</option>
                </Form.Select>
                {errors.category3 && <div className="text-danger">You must select a category</div>}
              </Col>
            </Form.Group>

            {/* Category 4 */}
            <Form.Group as={Row} className="mb-3" controlId="category4">
              <Form.Label column sm={3}>Category 4</Form.Label>
              <Col sm={9}>
                <Form.Select name="category4" onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Plastic Toys">Plastic Toys</option>
                  <option value="Wooden Toys">Wooden Toys</option>
                  <option value="Electronic Toys">Electronic Toys</option>
                </Form.Select>
                {errors.category4 && <div className="text-danger">You must select a category</div>}
              </Col>
            </Form.Group>

            {/* Footer Buttons */}
            <div className="d-flex justify-content-between">
              <Button variant="secondary">Cancel</Button>
              <Button variant="primary" onClick={handleSubmit}>Next</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
