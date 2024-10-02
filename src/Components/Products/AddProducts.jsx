import React, { useState } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  ToggleButtonGroup,
  ToggleButton,
  Modal,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import SuccessImage from "../../Data/success.png";


const AddProducts = () => {
  const location = useLocation(); // Access the location
  const categories = location.state; // Extract categories from the state
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleClose = () => setShowSuccessModal(false);
  const handleShow = () => setShowSuccessModal(true);
  const [products, setProducts] = useState([
    {
      productName: "",
      relatedProductName: "",
      productType: "",
      productDescription: "",
      productSpec: "",
      brand: "",
      productMarketing: "",
      productSKU: "",
      warranty: "",
      returnIn: "",
      actualPrice: "",
      referralAmount: "",
      cashbackAmount: "",
      hsncode: "",
      gst: "",
      weight: "",
      length: "",
      width: "",
      height: "",
      quantity: "",
      displayPrice: "",
      productImages: [],
      productCoverImage: "",
      displayProduct: "image",
      hasAttributes: false,
      attributes: [], // Placeholder for attributes
      selectedSizes: [], // Store selected attribute sizes
    },
  ]);

  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [name]: value,
    };
    setProducts(updatedProducts);
  };
  const handleRadioChange = (index, e) => {
    const { value } = e.target;
    const updatedProducts = [...products];
    updatedProducts[index].productMarketing = value;
    setProducts(updatedProducts);
  };

  const handleImageUpload = (index, e) => {
    const files = Array.from(e.target.files);
    const updatedProducts = [...products];
    updatedProducts[index].productImages = [
      ...updatedProducts[index].productImages,
      ...files,
    ];
    setProducts(updatedProducts);
  };

  const handleCoverImageUpload = (index, e) => {
    const file = e.target.files[0];
    const updatedProducts = [...products];
    updatedProducts[index].productCoverImage = file;
    setProducts(updatedProducts);
  };

  const handleRemoveImage = (productIndex, imageIndex) => {
    const updatedProducts = [...products];
    updatedProducts[productIndex].productImages = updatedProducts[
      productIndex
    ].productImages.filter((_, i) => i !== imageIndex);
    setProducts(updatedProducts);
  };

  const validateForm = () => {
    const newErrors = {};
    const currentProduct = products[activeProductIndex];

    const requiredFields = [
      "productName",
      "relatedProductName",
      "productType",
      "productDescription",
      "productSpec",
      "productSKU",
      "actualPrice",
      "displayPrice",
      "referralAmount",
      "cashbackAmount",
      "hsncode",
      "gst",
      "weight",
      "length",
      "width",
      "height",
      "quantity",
    ];

    requiredFields.forEach((field) => {
      if (!currentProduct[field]) {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required`;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const formattedData = {
        category: categories.category1, // Access category1 from the passed state
        products: products.map((product) => ({
          name: product.productName,
          related_product_name: product.relatedProductName,
          product_type: product.productType,
          product_description: product.productDescription,
          product_spec: product.productSpec,
          brand_id: product.brand, // Assuming brand is the brand_id
          product_marketing: product.productMarketing,
          product_sku: product.productSKU,
          warranty: product.warranty,
          return_in: product.returnIn,
          actual_price: product.actualPrice,
          display_price: product.displayPrice,
          referral_amount: product.referralAmount,
          cashback_amount: product.cashbackAmount,
          hsn_code: product.hsncode,
          gst: product.gst,
          weight: product.weight,
          length: product.length,
          width: product.width,
          attributes: {
            display_name: "SIZE", // Replace with actual display name if different
            attributes: product.selectedSizes.map((size, index) => ({
              attribute_id: size, // Replace with actual attribute IDs
              quantity: product.attributes[index]?.quantity || "",
              sku: product.attributes[index]?.sku || "",
            })),
          },
        })),
      };

      console.log("Formatted Data:", formattedData);
      
      // Create a JSON file and trigger a download
      const jsonString = JSON.stringify(formattedData, null, 2); // Pretty-printing JSON
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "products.json"; // Name of the file
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url); // Clean up
      handleShow();
    } else {
      console.log("Form has errors");
    }
  };

  const handleToggleAttributes = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].hasAttributes =
      !updatedProducts[index].hasAttributes;
    updatedProducts[index].selectedSizes = []; // Reset selected sizes
    setProducts(updatedProducts);
  };

  const handleSizeSelection = (size) => {
    const updatedProducts = [...products];
    const sizes = updatedProducts[activeProductIndex].selectedSizes;

    // Add or remove size from the selected sizes
    if (sizes.includes(size)) {
      updatedProducts[activeProductIndex].selectedSizes = sizes.filter(
        (s) => s !== size
      );
    } else {
      updatedProducts[activeProductIndex].selectedSizes.push(size);
    }

    setProducts(updatedProducts);
  };

  const handleQuantitySKUChange = (index, size, field, value) => {
    const updatedProducts = [...products];
    const sizesData = updatedProducts[index].selectedSizes;

    const sizeIndex = sizesData.indexOf(size);

    if (sizeIndex !== -1) {
      if (!updatedProducts[index].attributes[sizeIndex]) {
        updatedProducts[index].attributes[sizeIndex] = {
          quantity: "",
          sku: "",
        };
      }
      updatedProducts[index].attributes[sizeIndex][field] = value;
    }

    setProducts(updatedProducts);
  };
  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        productName: "",
        relatedProductName: "",
        productType: "",
        productDescription: "",
        productSpec: "",
        brand: "",
        productMarketing: "",
        productSKU: "",
        warranty: "",
        returnIn: "",
        actualPrice: "",
        referralAmount: "",
        cashbackAmount: "",
        hsncode: "",
        gst: "",
        weight: "",
        length: "",
        width: "",
        height: "",
        quantity: "",
        displayPrice: "",
        productImages: [],
        productCoverImage: "",
        displayProduct: "image",
      },
    ]);
    setActiveProductIndex(products.length); // Switch to the new product
  };

  return (
    <div className="container-fluid">
      <div className="container-fluid p-4">
        <div className="mb-4">
          <h4>Add Products</h4>
          <p className="text-muted">Products / add products</p>
        </div>

        {/* Add Product Button */}
        <div className="d-flex justify-content-between mb-4">
          <Button onClick={handleAddProduct}>+ Add Product</Button>
        </div>

        {/* Product Navigation Buttons */}
        <div className="d-flex mb-4">
          {products.map((product, index) => (
            <Button
              key={index}
              onClick={() => setActiveProductIndex(index)}
              className={`me-2 ${
                index === activeProductIndex ? "btn-success" : "btn-primary"
              }`}
            >
              Product {index + 1}
            </Button>
          ))}
        </div>

        <div className="card p-4">
          <h5>Product {activeProductIndex + 1} Details</h5>

          {/* Product Images */}
          <Form.Group as={Row} className="mb-3" controlId="productImages">
            <Form.Label column sm={3}>
              Product Images
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => handleImageUpload(activeProductIndex, e)}
              />
              <div className="mt-3">
                {products[activeProductIndex].productImages.map(
                  (image, index) => (
                    <div key={index} className="d-flex align-items-center mb-2">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Product"
                        width="50"
                        height="50"
                        className="me-2"
                      />
                      <Button
                        variant="danger"
                        onClick={() =>
                          handleRemoveImage(activeProductIndex, index)
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  )
                )}
              </div>
            </Col>
          </Form.Group>

          {/* Cover Image */}
          <Form.Group as={Row} className="mb-3" controlId="productCoverImage">
            <Form.Label column sm={3}>
              Product Cover Image
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="file"
                onChange={(e) => handleCoverImageUpload(activeProductIndex, e)}
              />
            </Col>
          </Form.Group>

          {/* Product Name */}
          <Form.Group as={Row} className="mb-3" controlId="productName">
            <Form.Label column sm={3}>
              Product Name <span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="productName"
                value={products[activeProductIndex].productName}
                onChange={(e) => handleChange(activeProductIndex, e)}
                isInvalid={!!errors.productName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.productName}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Related Product Name */}
          <Form.Group as={Row} className="mb-3" controlId="relatedProductName">
            <Form.Label column sm={3}>
              Related Product Name <span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                placeholder="Enter related product name"
                name="relatedProductName"
                value={products[activeProductIndex].relatedProductName}
                onChange={(e) => handleChange(activeProductIndex, e)}
                isInvalid={!!errors.relatedProductName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.relatedProductName}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Product Type */}
          <Form.Group as={Row} className="mb-3" controlId="productType">
            <Form.Label column sm={3}>
              Product Type <span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Select
                name="productType"
                value={products[activeProductIndex].productType}
                onChange={(e) => handleChange(activeProductIndex, e)}
                isInvalid={!!errors.productType}
              >
                <option value="">Select product type</option>
                <option value="Normal Product">Normal Product</option>
                <option value="Enquiry Product">Enquiry Product</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.productType}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="productDescription">
            <Form.Label column sm={3}>
              Product Description <span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                as="textarea"
                placeholder="Enter product description"
                name="productDescription"
                value={products[activeProductIndex].productDescription}
                onChange={(e) => handleChange(activeProductIndex, e)}
                isInvalid={!!errors.productDescription}
              />
              <Form.Control.Feedback type="invalid">
                {errors.productDescription}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="productSpecs">
            <Form.Label column sm={3}>
              Product Specifications <span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                as="textarea"
                placeholder="Enter product specifications"
                name="productSpec"
                value={products[activeProductIndex].productSpec}
                onChange={(e) => handleChange(activeProductIndex, e)}
                isInvalid={!!errors.productDescription}
              />
              <Form.Control.Feedback type="invalid">
                {errors.productSpec}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          {/* Brand */}
          <Form.Group as={Row} className="mb-3" controlId="brand">
            <Form.Label column sm={3}>
              Brand <span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Select
                name="brand"
                value={products[activeProductIndex].brand}
                onChange={(e) => handleChange(activeProductIndex, e)}
                isInvalid={!!errors.brand}
              >
                <option value="">Select Brand</option>
                <option value="Adidas">Adidas</option>
                <option value="Puma">Puma</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.brand}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <h4>General</h4>
          <Form>
            {/* Product Marketing - Radio Buttons */}
            <Form.Group as={Row} className="mb-3" controlId="productMarketing">
              <Form.Label column sm={3}>
                Product Marketing <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={9} className="d-flex">
                <Form.Check
                  type="radio"
                  label="Popular"
                  name="productMarketing"
                  value="Popular"
                  checked={
                    products[activeProductIndex].productMarketing === "Popular"
                  }
                  onChange={(e) => handleRadioChange(activeProductIndex, e)}
                  inline
                />
                <Form.Check
                  type="radio"
                  label="Trending"
                  name="productMarketing"
                  value="Trending"
                  checked={
                    products[activeProductIndex].productMarketing === "Trending"
                  }
                  onChange={(e) => handleRadioChange(activeProductIndex, e)}
                  inline
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="productSKU">
              <Form.Label column sm={3}>
                Product SKU <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter product SKU"
                  name="productSKU"
                  value={products[activeProductIndex].productSKU}
                  onChange={(e) => handleChange(activeProductIndex, e)}
                  isInvalid={!!errors.productSKU}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.productSKU}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="warranty">
              <Form.Label column sm={3}>
                Warranty <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={9}>
                <Form.Select
                  name="warranty"
                  value={products[activeProductIndex].warranty}
                  onChange={(e) => handleChange(activeProductIndex, e)}
                  isInvalid={!!errors.warranty}
                >
                  <option value="1 year">1 year</option>
                  <option value="2 year">2 year</option>
                  <option value="3 year">3 year</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.brand}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="returnIn">
              <Form.Label column sm={3}>
                Return In <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={9}>
                <Form.Select
                  name="returnIn"
                  value={products[activeProductIndex].returnIn}
                  onChange={(e) => handleChange(activeProductIndex, e)}
                  isInvalid={!!errors.returnIn}
                >
                  <option value="7 days">7 days</option>
                  <option value="14 days">14 days</option>
                  <option value="20 days">20 days</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.returnIn}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            {/* Price */}
            <Form.Group as={Row} className="mb-3" controlId="actualPrice">
              <Form.Label column sm={3}>
                Actual Price <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter actual price"
                  name="actualPrice"
                  value={products[activeProductIndex].actualPrice}
                  onChange={(e) => handleChange(activeProductIndex, e)}
                  isInvalid={!!errors.actualPrice}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.actualPrice}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            {/* Display Price */}
            <Form.Group as={Row} className="mb-3" controlId="displayPrice">
              <Form.Label column sm={3}>
                Display Price <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter display price"
                  name="displayPrice"
                  value={products[activeProductIndex].displayPrice}
                  onChange={(e) => handleChange(activeProductIndex, e)}
                  isInvalid={!!errors.displayPrice}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.displayPrice}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            {/* Referral Amount */}
            <Form.Group as={Row} className="mb-3" controlId="referralAmount">
              <Form.Label column sm={3}>
                Referral Amount <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter referral amount"
                  name="referralAmount"
                  value={products[activeProductIndex].referralAmount}
                  onChange={(e) => handleChange(activeProductIndex, e)}
                  isInvalid={!!errors.referralAmount}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.referralAmount}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            {/* Cashback Amount */}
            <Form.Group as={Row} className="mb-3" controlId="cashbackAmount">
              <Form.Label column sm={3}>
                Cashback Amount <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter cashback amount"
                  name="cashbackAmount"
                  value={products[activeProductIndex].cashbackAmount}
                  onChange={(e) => handleChange(activeProductIndex, e)}
                  isInvalid={!!errors.cashbackAmount}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.cashbackAmount}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            {/* HSN Code */}
            <Form.Group as={Row} className="mb-3" controlId="hsncode">
              <Form.Label column sm={3}>
                HSN Code <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter HSN code"
                  name="hsncode"
                  value={products[activeProductIndex].hsncode}
                  onChange={(e) => handleChange(activeProductIndex, e)}
                  isInvalid={!!errors.hsncode}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.hsncode}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            {/* GST */}
            <Form.Group as={Row} className="mb-3" controlId="gst">
              <Form.Label column sm={3}>
                GST <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter GST"
                  name="gst"
                  value={products[activeProductIndex].gst}
                  onChange={(e) => handleChange(activeProductIndex, e)}
                  isInvalid={!!errors.gst}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.gst}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <h4>Shipping</h4>
            {/* Weight */}
            <Form.Group as={Row} className="mb-3" controlId="weight">
              <Form.Label column sm={3}>
                Weight <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={9}>
                <Form.Select
                  name="weight"
                  value={products[activeProductIndex].weight}
                  onChange={(e) => handleChange(activeProductIndex, e)}
                  isInvalid={!!errors.weight}
                >
                  <option value=""></option>
                  <option value="2 kg">2 kg</option>
                  <option value="3 kg">3 kg</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.weight}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            {/* Length */}
            <Form.Group as={Row} className="mb-3" controlId="length">
              <Form.Label column sm={3}>
                Length <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter length"
                  name="length"
                  value={products[activeProductIndex].length}
                  onChange={(e) => handleChange(activeProductIndex, e)}
                  isInvalid={!!errors.length}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.length}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            {/* Width */}
            <Form.Group as={Row} className="mb-3" controlId="width">
              <Form.Label column sm={3}>
                Width <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter width"
                  name="width"
                  value={products[activeProductIndex].width}
                  onChange={(e) => handleChange(activeProductIndex, e)}
                  isInvalid={!!errors.width}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.width}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            {/* Height */}
            <Form.Group as={Row} className="mb-3" controlId="height">
              <Form.Label column sm={3}>
                Height <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter height"
                  name="height"
                  value={products[activeProductIndex].height}
                  onChange={(e) => handleChange(activeProductIndex, e)}
                  isInvalid={!!errors.height}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.height}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            {/* Quantity */}
            <Form.Group as={Row} className="mb-3" controlId="quantity">
              <Form.Label column sm={3}>
                Quantity <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter quantity"
                  name="quantity"
                  value={products[activeProductIndex].quantity}
                  onChange={(e) => handleChange(activeProductIndex, e)}
                  isInvalid={!!errors.quantity}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.quantity}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            {/* Toggle for Attributes */}
            <Form.Group as={Row} className="mb-3" controlId="hasAttributes">
              <Form.Label column sm={3}>
                Has Attributes?
              </Form.Label>
              <Col sm={9}>
                <ToggleButtonGroup
                  type="radio"
                  name="hasAttributes"
                  defaultValue={
                    products[activeProductIndex].hasAttributes ? "yes" : "no"
                  }
                >
                  <ToggleButton
                    id="tbg-radio-1"
                    value="yes"
                    onChange={() => handleToggleAttributes(activeProductIndex)}
                  >
                    Yes
                  </ToggleButton>
                  <ToggleButton
                    id="tbg-radio-2"
                    value="no"
                    onChange={() => handleToggleAttributes(activeProductIndex)}
                  >
                    No
                  </ToggleButton>
                </ToggleButtonGroup>
              </Col>
            </Form.Group>

            {/* Conditional Rendering of Attributes */}
            {products[activeProductIndex].hasAttributes && (
              <div>
                <h6>Select Sizes</h6>
                <div className="d-flex flex-column">
                  {["Extra Small", "Small", "Medium", "Large"].map((size) => (
                    <div key={size} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={size}
                        checked={products[
                          activeProductIndex
                        ].selectedSizes.includes(size)}
                        onChange={() => handleSizeSelection(size)}
                      />
                      <label className="form-check-label" htmlFor={size}>
                        {size}
                      </label>
                    </div>
                  ))}
                </div>

                {products[activeProductIndex].selectedSizes.map(
                  (size, index) => (
                    <div key={size} className="mt-3">
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId={`quantity-${size}`}
                      >
                        <Form.Label
                          column
                          sm={3}
                        >{`${size} Quantity`}</Form.Label>
                        <Col sm={9}>
                          <Form.Control
                            type="number"
                            placeholder="Quantity"
                            value={
                              products[activeProductIndex].attributes[index]
                                ?.quantity || ""
                            }
                            onChange={(e) =>
                              handleQuantitySKUChange(
                                activeProductIndex,
                                size,
                                "quantity",
                                e.target.value
                              )
                            }
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId={`sku-${size}`}
                      >
                        <Form.Label column sm={3}>{`${size} SKU`}</Form.Label>
                        <Col sm={9}>
                          <Form.Control
                            type="text"
                            placeholder="SKU"
                            value={
                              products[activeProductIndex].attributes[index]
                                ?.sku || ""
                            }
                            onChange={(e) =>
                              handleQuantitySKUChange(
                                activeProductIndex,
                                size,
                                "sku",
                                e.target.value
                              )
                            }
                          />
                        </Col>
                      </Form.Group>
                    </div>
                  )
                )}
              </div>
            )}

            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
              {/* Success Modal */}
              <Modal show={showSuccessModal} onHide={handleClose} centered>
                <Modal.Body className="text-center">
                    <div className="mb-4">
                        <img src={SuccessImage} alt="Success" width={50} />
                    </div>
                    <h5>Product Successfully Added!</h5>
                    <p>You have successfully added the product. Click continue to go to the dashboard.</p>
                    <Button variant="primary" onClick={handleClose}>
                        Continue
                    </Button>
                </Modal.Body>
            </Modal>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
