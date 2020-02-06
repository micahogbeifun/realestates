import React, {Fragment} from "react";
import Logo from "../../Logo/Logo";
import NavComponents from "../../NavComponents/NavComponents";
import "./SideMenu.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideMenu = props => {
  let attachedClasses = ['SideMenu', 'Closed'];
  if (props.open) {
    attachedClasses = ['SideMenu', 'Open'];
  }
  return (
    <Fragment>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <div className='SideMenuLogo'>
          <Logo />
        </div>
        <nav>
          <NavComponents isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Fragment>
  );
};
export default SideMenu;
