import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";

const MyOrders = () => {
  const { user } = useAuth();

  const [orders, setorders] = useState([]);

  const email = user.email;

  // fetch data to load page count
  useEffect(() => {
    fetch(
      `https://frightening-mansion-85633.herokuapp.com/orders/${email}`
    ).then((res) =>
      res.json().then((data) => {
        setorders(data);
      })
    );
  }, [email]);

  const handleCancelbtn = (id) => {
    const process = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (process) {
      fetch(`https://frightening-mansion-85633.herokuapp.com/orders/${id}`, {
        method: "delete",
        headers: {
          "content-type": "Application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("Order cancelled successfully");
            window.location.reload();
          }
        });
    } else {
      return;
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-lg-4">
          <hr className="mt-4" />
        </div>
        <div className="col-sm-12 col-lg-4">
          <h1 className="App">Your Orders</h1>
        </div>
        <div className="col-sm-12 col-lg-4">
          <hr className="mt-4" />
        </div>
      </div>

      <div className="row">
        {orders.map((order) => (
          <div className="col-12 mt-3">
            <div className="d-flex flex-wrap shadow position-relative rounded">
              <div className="col-sm-12 col-lg-3 text-start">
                <img
                  src={order.img}
                  alt="product"
                  className="img-fluid h-100 rounded"
                />
              </div>
              <div className="col-sm-12 col-lg-4">
                <div className="m-2">
                  <h2 className="text-fresh">{order.serviceName}</h2>
                  <span>Fastest delivery within {order.time}</span>
                  <br />
                  <span>Pick the parcel from {order.pickUp}</span>
                  <br />
                  <span>Send the parcel to {order.destination}</span>
                </div>
              </div>
              <div className="col-sm-12 col-lg-5">
                <div className="m-2 mt-2">
                  <h5>Ordered by: {order.userName}</h5>
                  <span>Email: {order.email}</span>
                  <br />
                  <span>Delivery Fee: {order.cost} BDT</span>
                  <br />
                  <span>Delivery status: {order.status}</span>

                  <button
                    onClick={() => {
                      handleCancelbtn(order._id);
                    }}
                    className="position-absolute bottom-0 end-0 me-2 mb-2 btn btn-primary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
