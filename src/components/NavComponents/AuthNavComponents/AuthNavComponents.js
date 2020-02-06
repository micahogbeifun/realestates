import React, {Fragment} from "react";

import "./AuthNavComponents.css";
import NavComponent from '../NavComponent/NavComponent';

const AuthNavComponents = props => (
  <ul className='AuthNavComponents'>
    {props.isAuthenticated ? (
      <NavComponent link="/watch-list">Your List</NavComponent>
    ) : null}
    {props.isAuthenticated ? (
      <NavComponent link="/logout">Logout</NavComponent>
    ) : (
      <Fragment>
      <NavComponent link="/login">Login</NavComponent>
      <NavComponent link="/sign-up">Sign Up</NavComponent>
      </Fragment>
    )}
  </ul>
);

export default AuthNavComponents;
