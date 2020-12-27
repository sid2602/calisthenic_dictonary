import React, { useState } from "react";
import Navigation from "./navigation";
import Drawer from "./drawer";

type ContextTypes = {
  toogleDrawer: () => void;
  isActive: boolean;
};

export const NavContext = React.createContext<Partial<ContextTypes>>({});

const Nav = () => {
  const [isActive, setIsActive] = useState(false);

  const toogleDrawer = () => {
    setIsActive(!isActive);
  };

  return (
    <NavContext.Provider
      value={{
        isActive,
        toogleDrawer,
      }}
    >
      <Navigation />
      <Drawer />
    </NavContext.Provider>
  );
};

export default Nav;
