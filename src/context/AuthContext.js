"use client";

import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { firebaseApp } from "@/firebase/config";
import Loading from "@/app/components/Loading";

const auth = getAuth(firebaseApp);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        const isAdmin = !!idTokenResult.claims.admin;
        // const isAdmin = true;

        const modUser = {
          ...user,
          isAdmin,
        };

        setUser(modUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};
