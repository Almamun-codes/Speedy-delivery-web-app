import React, { useRef } from "react";
import { useHistory } from "react-router";

const AddService = () => {
  const nameref = useRef();
  const descriptionref = useRef();
  const imgref = useRef();
  const chargeref = useRef();
  const hadleAddService = (e) => {
    const service = {
      name: nameref.current.value,
      description: descriptionref.current.value,
      img: imgref.current.value,
      charge: chargeref.current.value,
    };

    fetch("https://frightening-mansion-85633.herokuapp.com/add-a-service", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(service),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("service added successfully");
          e.target.reset();
        }
      });

    e.preventDefault();
  };
  return (
    <div className="text-center">
      <h1>Add a Service!</h1>
      <div className="container shadow my-4">
        <form className="row bg-light py-4" onSubmit={hadleAddService}>
          <div className="col-6">
            <label className="text-start">Service Name</label>
            <br />
            <input ref={nameref} type="text" name="name" className="w-75" />
            <br />
          </div>
          <div className="col-6">
            <label className="text-start">Time needed</label>
            <br />
            <input ref={descriptionref} type="text" className="w-75" />
          </div>
          <div className="col-6">
            <br />
            <label className="text-start">Image-Url</label>
            <br />
            <input ref={imgref} type="text" className="w-75" />
          </div>
          <div className="col-6">
            <br />
            <label className="text-start">Delivery-fee</label>
            <br />
            <input ref={chargeref} type="number" className="w-75" />
          </div>
          <br />
          <br />
          <div className="text-center">
            <button className="btn btn-success text-center" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddService;
