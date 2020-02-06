import React from "react";
import "./TopMenu.css";
import Logo from "../../Logo/Logo";
import NavComponents from "../../NavComponents/NavComponents";
import AuthNavComponents from "../../NavComponents/AuthNavComponents/AuthNavComponents";
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
    {/* <div className="TopMenuTwo">
      <nav className="MenuAuth">
        <AuthNavComponents isAuthenticated={props.isAuth} />
      </nav>
    </div> */}
  </header>
);

export default TopMenu;
