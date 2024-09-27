import React from 'react';
import { NavLink } from 'react-router-dom';



function SideNav() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="/" className="brand-link">
        <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
        <span className="brand-text font-weight-light">AdminLTE 3</span>
      </a>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
          </div>
          <div className="info">
            <a href="#" className="d-block">Alexander Pierce</a>
          </div>
        </div>
        {/* SidebarSearch Form */}
        <div className="form-inline">
          <div className="input-group" data-widget="sidebar-search">
            <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
            <div className="input-group-append">
              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw" />
              </button>
            </div>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li className="nav-item ">
              <NavLink to="/" className="nav-link" activeClassName="active">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>
                  Dashboard
                  
                </p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/users" className="nav-link" activeClassName="active">
                <i className="nav-icon fas fa-users mr-3" />
                <p>
                  Users
                </p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/guestbook" className="nav-link" activeClassName="active">
                <i className="nav-icon fas fa-th" />
                <p>
                  Buku Tamu
                  <span className="right badge badge-danger">New</span>
                </p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link" activeClassName="active">
                <i className="nav-icon fas fa-sign-out-alt" />
                <p>
                  Log Out
                </p>
              </NavLink>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
}

export default SideNav;