import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <hr />
      <div className="container-fluid bg-fresh pt-3">
        <div className="row">
          <div className="col-sm-12 col-lg-3">
            <div className="rounded-circle bg-light mx-5">
              <img
                src="https://www.speedydeliveryllc.com/wp-content/uploads/2018/04/speedy-delivery-white-glove-3pl.png"
                className="footer-logo img-fluid pt-2"
                alt="logo"
              />
            </div>
          </div>
          <div className="col-lg-3"></div>

          <div className="col-sm-6 col-lg-3 ps-3 text-start">
            <h3>Explore</h3>
            <p>
              <NavLink className="text-decoration-none text-dark" to="/service">
                services
              </NavLink>
            </p>

            <p>
              <NavLink
                className="text-decoration-none text-dark"
                to="/my-orders"
              >
                My Orders
              </NavLink>
            </p>
          </div>
          <div className="col-sm-6 col-lg-3 text-end pe-5">
            <h3>Address</h3>
            <p>343,street name, city, country</p>
            <p>phone: 0123456789</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
