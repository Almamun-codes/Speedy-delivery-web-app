import { useEffect, useState } from "react";
import initializeAuthentication from "../firebase/firebase.init";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

initializeAuthentication();

const useFirebase = () => {
  // state change of user
  const [user, setuser] = useState({});
  // state change of error
  const [error, setError] = useState("");
  // state change of loading
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();

  // create new google provider
  const GoogleProvider = new GoogleAuthProvider();

  //google sign in handler
  const signInWithGoogle = () => {
    setIsLoading(true);
    return signInWithPopup(auth, GoogleProvider);
  };

  // log out the user
  const logOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setuser({});
      })
      .finally(setIsLoading(false));
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setuser(user);
      } else {
        setuser({});
      }
      setIsLoading(false);
    });
  }, []);

  return {
    user,
    error,
    isLoading,
    setError,
    setuser,
    setIsLoading,
    signInWithGoogle,
    logOut,
  };
};

export default useFirebase;
