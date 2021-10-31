import { useEffect, useState } from "react";

const useServices = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch("https://frightening-mansion-85633.herokuapp.com/services").then(
      (res) =>
        res.json().then((data) => {
          setServices(data.services);
        })
    );
  }, []);

  return services;
};

export default useServices;
