import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation(); // Get the current location

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
            <ul className="sidebarnav">
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4" />
                <span className="hide-menu">ADMIN</span>
              </li>
              <li className="sidebar-item">
                <NavLink
                  exact
                  className="sidebar-link"
                  to="/"
                  aria-expanded="false"
                  isActive={() => location.pathname === "/"}
                >
                  <span>
                    <i className="ti ti-layout-dashboard" />
                  </span>
                  <span className="hide-menu">Dashboard</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/orders"
                  aria-expanded="false"
                  isActive={() => location.pathname === "/orders"}
                >
                  <span>
                    <i className="ti ti-shopping-cart" />
                  </span>
                  <span className="hide-menu">Orders</span>
                </NavLink>
              </li>
            </ul>
            <ul className="sidebarnav">
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4" />
                <span className="hide-menu">OneRupee</span>
              </li>
              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/attributes"
                  aria-expanded="false"
                  isActive={() => location.pathname === "/attributes"}
                >
                  <span>
                    <i className="ti ti-tag" />
                  </span>
                  <span className="hide-menu">Attributes</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/products"
                  aria-expanded="false"
                  isActive={() => location.pathname === "/products"}
                >
                  <span>
                    <i className="ti ti-package" />
                  </span>
                  <span className="hide-menu">Products</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/inventory"
                  aria-expanded="false"
                  isActive={() => location.pathname === "/inventory"}
                >
                  <span>
                    <i className="ti ti-clipboard" />
                  </span>
                  <span className="hide-menu">Inventory</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/account"
                  aria-expanded="false"
                  isActive={() => location.pathname === "/account"}
                >
                  <span>
                    <i className="ti ti-user" />
                  </span>
                  <span className="hide-menu">Account</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/brands"
                  aria-expanded="false"
                  isActive={() => location.pathname === "/brands"}
                >
                  <span>
                    <i className="ti ti-star" />
                  </span>
                  <span className="hide-menu">Brands</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/store"
                  aria-expanded="false"
                  isActive={() => location.pathname === "/store"}
                >
                  <span>
                    <i className="ti ti-shopping-cart" />
                  </span>
                  <span className="hide-menu">Store</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/marketing"
                  aria-expanded="false"
                  isActive={() => location.pathname === "/marketing"}
                >
                  <span>
                    <i className="ti ti-rocket" />
                  </span>
                  <span className="hide-menu">Marketing</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/user-role"
                  aria-expanded="false"
                  isActive={() => location.pathname === "/user-role"}
                >
                  <span>
                    <i className="ti ti-users" />
                  </span>
                  <span className="hide-menu">User Role</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/customers"
                  aria-expanded="false"
                  isActive={() => location.pathname === "/customers"}
                >
                  <span>
                    <i className="ti ti-user-check" />
                  </span>
                  <span className="hide-menu">Customers</span>
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  className="sidebar-link"
                  to="/settings"
                  aria-expanded="false"
                  isActive={() => location.pathname === "/settings"}
                >
                  <span>
                    <i className="ti ti-settings" />
                  </span>
                  <span className="hide-menu">Settings</span>
                </NavLink>
              </li>
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
