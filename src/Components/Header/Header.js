import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Header = () => {
  const { user, logOut } = useAuth();

  const handlelogout = () => {
    logOut();
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-fresh">
        <div className="container">
          <NavLink className="navbar-brand" to="/home">
            <div className="rounded bg-light">
              <img
                src="https://www.speedydeliveryllc.com/wp-content/uploads/2018/04/speedy-delivery-white-glove-3pl.png"
                style={{ height: "60px" }}
                alt="logo"
              />
            </div>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/service">
                  Services
                </NavLink>
              </li>

              {/* <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li> */}
              {user.email ? (
                <span className="d-lg-flex">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/my-orders">
                      My Orders
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/manage-all-orders">
                      Manage All Orders
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/add-a-service">
                      Add a Service
                    </NavLink>
                  </li>
                </span>
              ) : (
                ""
              )}
            </ul>
          </div>
          {user.email ? (
            <div className="d-flex">
              <h5 className="mt-2">Signed in as: {user.displayName}</h5>
              <button onClick={handlelogout} className="btn btn-danger ms-2">
                SignOut
              </button>
            </div>
          ) : (
            <div>
              <NavLink className="text-decoration-none" to="/login">
                <div className="btn btn-outline-primary me-2 text-white">
                  LogIN
                </div>
              </NavLink>
              <NavLink className="text-decoration-none" to="/register">
                <div className="btn btn-outline-primary me-2 text-white">
                  Register
                </div>
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
