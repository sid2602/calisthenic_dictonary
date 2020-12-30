import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { isLoggedIn } from "services/auth";
type Props = {
  children: React.ReactNode;
};

const AuthContext = createContext({});

function AuthProvider({ children }: Props) {
  const { pathname, events } = useRouter();
  const [user, setUser] = useState<string | null>();

  useEffect(() => {
    setUser(isLoggedIn());
  }, [pathname]);

  useEffect(() => {
    // Check that a new route is OK
    const handleRouteChange = (url: string) => {
      if (url !== "/login" && !user) {
        window.location.href = "/login";
      }
    };

    // Check that initial route is OK
    if (pathname !== "/login" && user === null) {
      window.location.href = "/login";
    }

    // Monitor routes
    events.on("routeChangeStart", handleRouteChange);
    return () => {
      events.off("routeChangeStart", handleRouteChange);
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
