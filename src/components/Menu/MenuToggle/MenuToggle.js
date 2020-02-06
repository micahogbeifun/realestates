import React from "react";
import "./MenuToggle.css";

const MenuToggle = props => (
  <div className="MenuToggle" onClick={props.clicked}>
    <ion-icon name="menu"></ion-icon>
  </div>
);

export default MenuToggle;
