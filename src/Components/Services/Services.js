import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Services = () => {
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);

  const [services, setServices] = useState([]);

  const size = 4;

  // fetch data to load page count
  useEffect(() => {
    fetch(`http://localhost:3001/services?page=${page}&&size=${size}`).then(
      (res) =>
        res.json().then((data) => {
          setServices(data.services);
          const pages = Math.ceil(data.count / size);
          setCount(pages);
        })
    );
  }, [page]);
  return (
    <div className="container App">
      <div className="row">
        <div className="col-sm-12 col-lg-4">
          <hr className="mt-4" />
        </div>
        <div className="col-sm-12 col-lg-4">
          <h1>Hottest Packages</h1>
        </div>
        <div className="col-sm-12 col-lg-4">
          <hr className="mt-4" />
        </div>
      </div>
      <div className="row">
        {services.map((service) => (
          <div className="col-sm-12 col-lg-3 my-3">
            <div className="h-100 m-2 shadow">
              <div>
                <img
                  src={service.img}
                  alt="thumbnail"
                  className="img-fluid w-100"
                />
              </div>
              <div className="text-center m-2">
                <h3 className="text-fresh">{service.name}</h3>
                <p>Parcel will be sent within {service.description}</p>
                <p>Applicable for {service.area}</p>
                <p>Delivery Cost: {service.cost} BDT</p>
                <Link to={`/place-order/${service._id}`}>
                  <button className="btn btn-outline-primary">Order</button>
                </Link>
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
                ? "btn btn-primary text-white mx-2"
                : "btn btn-secondary mx-2"
            }
          >
            {element + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Services;
