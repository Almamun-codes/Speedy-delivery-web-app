import React from "react";
import { useHistory, useLocation } from "react-router";
import useAuth from "../../Hooks/useAuth";

const Register = () => {
  const { signInWithGoogle, error, setError, setuser, setIsLoading } =
    useAuth();

  const location = useLocation();
  const history = useHistory();
  const url = location.state?.from || "/home";
  const handleGoogoleRegister = (e) => {
    e.preventDefault();
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);
        setuser(user);
        history.push(url);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      })
      .finally(setIsLoading(false));
  };
  return (
    <div className="text-center">
      <h1>Please Register!</h1>
      <form onSubmit={handleGoogoleRegister}>
        <input type="text" name="name" placeholder="Your Name" />
        <br />
        <br />
        <input type="email" name="email" placeholder="Your Email Address" />
        <br />
        <br />
        <input type="password" placeholder="Set A Password" />
        <br />
        <p>{error}</p>
        <input
          type="button"
          value="Register"
          onClick={() =>
            setError("this button does not work. please use google log in.")
          }
        />
        <br />
        <br />
        <input type="submit" value="Log in with google" />
      </form>
    </div>
  );
};

export default Register;
