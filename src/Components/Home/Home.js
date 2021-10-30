import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useServices from "../useServices/useServices";

const Home = () => {
  // import useCourses to load courses
  const services = useServices();
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/team")
      .then((res) => res.json())
      .then((data) => setTeam(data));
  }, []);

  const special = [];

  services.forEach((service) => {
    if (service.specialService) {
      special.push(service);
    }
  });

  // take only 4 from the courses
  const allServices = services.slice(0, 6);

  return (
    <div>
      {services[2] ? (
        <div>
          <div className="d-flex">
            <div className="col-lg-6 col-sm-12 Pt-5 bg-pink">
              <div className="ps-5 mt-5 pe-2 pb-3">
                <h1>
                  Speedy is the fastet and most secured way to send your stuff.
                </h1>
                <p>For safe and trusted parcel delivery order now.</p>
                <Link to="/place-order/617b6e56e5e71acd3880d641">
                  <div className="btn btn-outline-secondary">OrderNow!</div>
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 pt-5 text-center">
              <img
                className="img-fluid"
                src="https://media.edgeprop.my/s3fs-public/styles/newsthumbnails/public/field/image/delivery-man-with-face-mask-delivering-order-motorcycle_154993-160_0.jpg"
                alt=""
              />
            </div>
          </div>
          <h1 className="text-center text-dark bg-fresh rounded p-2">
            Services
          </h1>
          <div className="container">
            <div className="row">
              {allServices.map((service) => (
                <div key={service._id} className="col-sm-6 col-lg-4 my-3">
                  <div className="h-100 m-2 shadow">
                    <div>
                      <img
                        src={service.img}
                        alt="thumbnail"
                        className="img-fluid w-100"
                      />
                    </div>
                    <div className="text-center">
                      <h1 className="text-fresh">{service.name}</h1>
                      <p>Parcel will be sent within {service.description}</p>
                      <p>Applicable for {service.area}</p>
                      <p>Delivery Charge: {service.cost} BDT</p>
                      <Link to={`/place-order/${service._id}`}>
                        <button className="btn btn-outline-primary">
                          Order
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <h1 className="text-center text-dark bg-fresh rounded p-2 mt-5">
            Special Services
          </h1>
          <div className="container">
            <div className="row">
              {special.map((service) => (
                <div key={service._id} className="col-sm-12 col-lg-4 my-3">
                  <div className="h-100 m-2 shadow">
                    <div>
                      <img
                        src={service.img}
                        alt="thumbnail"
                        className="img-fluid w-100"
                      />
                    </div>
                    <div className="text-center px-2">
                      <h3 className="text-fresh">{service.name}</h3>
                      <p>{service.desk}</p>
                      <p>Parcel will be sent within {service.description}</p>
                      <p>Delivery Charge: {service.cost} BDT</p>
                      <Link to={`/place-order/${service._id}`}>
                        <button className="btn btn-outline-primary">
                          Order
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <h1 className="text-center text-dark bg-fresh rounded p-2 mt-5">
            Our Speedy Team
          </h1>
          <div className="container">
            <div className="row justify-content-center">
              {team.map((member) => (
                <div key={member._id} className="col-sm-12 col-lg-3 my-3">
                  <div className="h-100 m-2 shadow">
                    <div>
                      <img
                        src={member.img}
                        alt="thumbnail"
                        className="img-fluid w-100 teampic"
                      />
                    </div>
                    <div className="text-center px-2">
                      <h3 className="text-fresh">{member.name}</h3>
                      <p>Department: {member.department}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
