import React from "react";

import "./NavComponents.css";
import NavComponent from "./NavComponent/NavComponent";

const NavComponents = props => (
  <ul className="NavComponents">
    <NavComponent link="/buy" exact>
      Buy
    </NavComponent>
    <NavComponent link="/rent" exact>
      Rent
    </NavComponent>
    {/* <NavComponent link="/sell" exact>
      Sell
    </NavComponent> */}
  </ul>
);

export default NavComponents;
