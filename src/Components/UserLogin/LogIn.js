import React from "react";
import { useHistory, useLocation } from "react-router";
import useAuth from "../../Hooks/useAuth";

const LogIn = () => {
  const { signInWithGoogle, setuser, setError, setIsLoading } = useAuth();

  const location = useLocation();
  const history = useHistory();
  const url = location.state?.from || "/home";

  const handleLogin = (e) => {
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
    e.preventDefault();
  };
  return (
    <div className="text-center">
      <h1>Please Log In</h1>
      <form onSubmit={handleLogin}>
        <input type="text" name="email" />
        <br />
        <br />
        <input type="password" name="password" />
        <br />
        <br />
        <input type="submit" value="Log In" />
      </form>
    </div>
  );
};

export default LogIn;
