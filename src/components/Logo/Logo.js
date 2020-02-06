import React from "react";
import "./Logo.css";

import MyLogo from "../../assets/Logo/logo.png";

const Logo = props => (
  <div className='Logo' style={{ height: props.height }}>
    <img src={MyLogo} alt="MyLogo"></img>
  </div>
);

export default Logo;
