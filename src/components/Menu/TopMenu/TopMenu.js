import React from "react";
import "./TopMenu.css";
import Logo from "../../Logo/Logo";
import NavComponents from "../../NavComponents/NavComponents";
import MenuToggle from "../MenuToggle/MenuToggle";

const TopMenu = props => (
  <header className="TopMenu">
    <div className="TopMenuOne">
      <MenuToggle clicked={props.MenuToggleClicked} />
      <div className="MenuLogo">
        <Logo />
      </div>
      <nav className="DesktopOnly">
        <NavComponents />
      </nav>
    </div>
  </header>
);

export default TopMenu;
