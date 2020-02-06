import React from "react";
import "./NavComponent.css";
import { NavLink } from "react-router-dom";

const NavComponent = props => (
  <li className='NavComponent'>
    <NavLink
      to={props.link}
      exact={props.exact}
      activeClassName='active'
    >
      {props.children}
    </NavLink>
    
  </li>
);

export default NavComponent;
