import React from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

export function DrawerMenu({ children, isOpen, setIsOpen, direction }) {
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <Drawer open={isOpen} onClose={toggleDrawer} direction={direction} lockBackgroundScroll={true}>
      {children}
    </Drawer>
  );
}
