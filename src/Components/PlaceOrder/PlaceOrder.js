import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const PlaceOrder = () => {
  const { user } = useAuth();
  const { id } = useParams();

  const [service, setService] = useState({});
  const pickupRef = useRef();
  const destinationRef = useRef();

  useEffect(() => {
    fetch(`http://localhost:3001/services/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data));
  }, []);

  const history = useHistory();

  const handlePlaceOrder = (e) => {
    const order = {
      userName: user.displayName,
      email: user.email,
      pickUp: pickupRef.current.value,
      destination: destinationRef.current.value,
      serviceName: service.name,
      time: service.description,
      img: service.img,
      cost: service.cost,
      status: "Pending",
    };

    fetch("http://localhost:3001/place-order", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("Order placed successfully");
          history.push("/my-orders");
        }
      });

    e.preventDefault();
  };

  return (
    <div>
      <div className="bg-secondary">
        <div className="container-fluid">
          <div className="container bg-secondary">
            <div className="text-white">
              <form onSubmit={handlePlaceOrder}>
                <h3 className="border-bottom border-primary border-3 pt-4">
                  Place Information
                </h3>
                <div className="row">
                  <div className="col-sm-12 col-lg-6">
                    <label>PickUp Place</label>
                    <br />
                    <input
                      type="text"
                      ref={pickupRef}
                      className="w-75 rounded outline-none"
                    />
                  </div>
                  <div className="col-sm-12 col-lg-6">
                    <label>Destination</label>
                    <br />
                    <input
                      type="text"
                      ref={destinationRef}
                      className="w-75 rounded outline-none"
                    />
                  </div>
                  <div className="col-sm-12 col-lg-6">
                    <label>Delivery-Name</label>
                    <br />
                    <input
                      type="text"
                      value={service?.name}
                      readOnly
                      className="w-75 rounded outline-none"
                    />
                  </div>
                  <div className="col-sm-12 col-lg-6">
                    <label>Time Needed</label>
                    <br />
                    <input
                      type="text"
                      value={service?.description}
                      readOnly
                      className="w-75 rounded outline-none"
                    />
                  </div>
                  <div className="col-sm-12 col-lg-6">
                    <label>Image url</label>
                    <br />
                    <input
                      type="text"
                      value={service?.img}
                      readOnly
                      className="w-75 rounded outline-none"
                    />
                  </div>
                  <div className="col-sm-12 col-lg-6">
                    <label>Cost</label>
                    <br />
                    <input
                      type="text"
                      value={service?.cost}
                      readOnly
                      className="w-75 rounded outline-none"
                    />
                  </div>
                </div>

                {/* user information */}
                <h3 className="border-bottom border-primary border-3 mt-4">
                  Your Information
                </h3>
                <div className="row">
                  <div className="col-sm-12 col-lg-6">
                    <label htmlFor="name">Your Name</label>
                    <br />
                    <input
                      type="text"
                      name="name"
                      value={user.displayName}
                      readOnly
                      className="w-75 rounded outline-none"
                    />
                  </div>
                  <div className="col-sm-12 col-lg-6">
                    <label>Your Email</label>
                    <br />
                    <input
                      type="text"
                      value={user.email}
                      readOnly
                      className="w-75 rounded outline-none"
                    />
                  </div>
                </div>
                <div>
                  <br />
                  <Link to="/service">
                    <p className="text-white">
                      Not this service? Check out these services.
                    </p>
                  </Link>
                  <br />
                  <button type="submit" className="btn btn-primary mb-4">
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
