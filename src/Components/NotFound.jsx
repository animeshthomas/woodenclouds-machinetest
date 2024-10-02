import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
  <section className="py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center">
  <div className="container">
    <div className="row">
      <div className="col-12">
        <div className="text-center">
          <h2 className="d-flex justify-content-center align-items-center gap-2 mb-4">
            <span className="display-1 fw-bold">4</span>
            <i className="bi bi-exclamation-circle-fill text-danger display-4">
              0
            </i>
            <span className="display-1 fw-bold bsb-flip-h">4</span>
          </h2>
          <h3 className="h2 mb-2">🚧 Work in Progress! 🚧</h3>
          <p className="mb-5"> Sorry, the page you are looking for is currently under construction. Please check back later!</p>
          <Link className="btn bsb-btn-5xl btn-dark rounded-pill px-5 fs-6 m-0" to="/" role="button">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

  );
};

export default NotFound;
