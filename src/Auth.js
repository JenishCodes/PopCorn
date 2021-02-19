import React, { useEffect, useState, createContext } from "react";
import Loading from "./Components/Loading";
import firebaseConfig from "./Config/config";
import { getUser } from "./Services/UserService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebaseConfig.auth().onAuthStateChanged((user) => {
      getUser(user && user.uid)
        .then((data) => setCurrentUser(data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    });
    return () => unsubscribe();
  });

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser }}
    >
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};
