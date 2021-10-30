import React, { useEffect, useState } from "react";

const ManageAll = () => {
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);

  const [totalorders, setTotalOrders] = useState(0);
  const [orders, setorders] = useState([]);

  const size = 3;

  // fetch data to load page count
  useEffect(() => {
    fetch(`http://localhost:3001/orders?page=${page}&&size=${size}`).then(
      (res) =>
        res.json().then((data) => {
          setorders(data.orders);
          setTotalOrders(data.count);
          const pages = Math.ceil(data.count / size);
          setCount(pages);
        })
    );
  }, [page]);

  const [order, setOrder] = useState({});

  const handleApprovebtn = (id) => {
    orders.forEach((element) => {
      if (element._id === id) {
        setOrder(element);
      }
    });

    if (order._id) {
      const updatedOrder = { ...order };
      console.log(orders);
      updatedOrder.status = "Approved";
      setOrder(updatedOrder);

      fetch(`http://localhost:3001/orders/${id}`, {
        method: "put",
        headers: {
          "content-type": "Application/json",
        },
        body: JSON.stringify(order),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            alert("Order Approved successfully");
            window.location.reload();
          }
        });
    } else {
      alert("Data Loading... Please wait a little bit...");
    }
  };

  const handleCancelbtn = (id) => {
    const process = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (process) {
      fetch(`http://localhost:3001/orders/${id}`, {
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
          <h1 className="App">All Orders</h1>
        </div>
        <div className="col-sm-12 col-lg-4">
          <hr className="mt-4" />
        </div>
      </div>
      <div className="text-center">Total {totalorders} Orders</div>
      <div className="row">
        {orders.map((order) => (
          <div key={order._id} className="col-12 mt-3">
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

                  <div className="">
                    <button
                      onClick={() => handleApprovebtn(order._id)}
                      className={
                        order.status === "Approved"
                          ? "position-absolute bottom-0 end-0 me-2 mb-2 btn btn-primary disabled"
                          : "position-absolute bottom-0 end-0 me-2 mb-2 btn btn-primary"
                      }
                    >
                      Approve
                    </button>
                  </div>
                  <button
                    onClick={() => handleCancelbtn(order._id)}
                    className="position-absolute bottom-0 end-0 cancel-btn mb-2 btn btn-primary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="App ">
        {[...Array(count).keys()].map((element) => (
          <button
            key={element}
            onClick={() => setPage(element)}
            className={
              page === element
                ? "btn btn-primary text-white mt-3 mx-2"
                : "btn btn-secondary mt-3 mx-2"
            }
          >
            {element + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManageAll;
