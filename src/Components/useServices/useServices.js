import { useEffect, useState } from "react";

const useServices = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/services").then((res) =>
      res.json().then((data) => {
        setServices(data.services);
      })
    );
  }, []);

  return services;
};

export default useServices;
