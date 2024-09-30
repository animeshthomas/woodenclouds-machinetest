import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const SideBar = () => {
  return (
    <div>
      <aside className="left-sidebar">
        {/* Sidebar scroll */}
        <div>
          <div className="brand-logo d-flex align-items-center justify-content-between">
            <div
              className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
              id="sidebarCollapse"
            >
              <i className="ti ti-x fs-8" />
            </div>
          </div>
          {/* Sidebar navigation */}
          <nav className="sidebar-nav scroll-sidebar" data-simplebar>
            <ul id="sidebarnav">
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4" />
                <span className="hide-menu">ADMIN</span>
              </li>
              <li className="sidebar-item">
                <Link className="sidebar-link" to="/" aria-expanded="false">
                  <span>
                    <i className="ti ti-layout-dashboard" />
                  </span>
                  <span className="hide-menu">Dashboard</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link className="sidebar-link" to="/orders" aria-expanded="false">
                  <span>
                    <i className="ti ti-shopping-cart" />
                  </span>
                  <span className="hide-menu">Orders</span>
                </Link>
              </li>
            </ul>
            <ul id="sidebarnav">
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4" />
                <span className="hide-menu">OneRupee</span>
              </li>
              <li className="sidebar-item">
                <Link className="sidebar-link" to="/attributes" aria-expanded="false">
                  <span>
                    <i className="ti ti-tag" /> {/* Attributes */}
                  </span>
                  <span className="hide-menu">Attributes</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link className="sidebar-link" to="/products" aria-expanded="false">
                  <span>
                    <i className="ti ti-package" /> {/* Products */}
                  </span>
                  <span className="hide-menu">Products</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link className="sidebar-link" to="/inventory" aria-expanded="false">
                  <span>
                    <i className="ti ti-clipboard" /> {/* Inventory */}
                  </span>
                  <span className="hide-menu">Inventory</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link className="sidebar-link" to="/account" aria-expanded="false">
                  <span>
                    <i className="ti ti-user" /> {/* Account */}
                  </span>
                  <span className="hide-menu">Account</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link className="sidebar-link" to="/brands" aria-expanded="false">
                  <span>
                    <i className="ti ti-star" /> {/* Brands */}
                  </span>
                  <span className="hide-menu">Brands</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link className="sidebar-link" to="/store" aria-expanded="false">
                  <span>
                    <i className="ti ti-shopping-cart" /> {/* Store */}
                  </span>
                  <span className="hide-menu">Store</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link className="sidebar-link" to="/marketing" aria-expanded="false">
                  <span>
                    <i className="ti ti-rocket" /> {/* Marketing */}
                  </span>
                  <span className="hide-menu">Marketing</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link className="sidebar-link" to="/user-role" aria-expanded="false">
                  <span>
                    <i className="ti ti-users" /> {/* User Role */}
                  </span>
                  <span className="hide-menu">User Role</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link className="sidebar-link" to="/customers" aria-expanded="false">
                  <span>
                    <i className="ti ti-user-check" /> {/* Customers */}
                  </span>
                  <span className="hide-menu">Customers</span>
                </Link>
              </li>
              {/* Add more sidebar items as needed */}
            </ul>
          </nav>
          {/* End Sidebar navigation */}
        </div>
        {/* End Sidebar scroll */}
      </aside>
    </div>
  );
};

export default SideBar;
