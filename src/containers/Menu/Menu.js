import React, { Component, Fragment } from "react";

import "./Menu.css";
import TopMenu from "../../components/Menu/TopMenu/TopMenu";
import SideMenu from "../../components/Menu/SideMenu/SideMenu";

class Menu extends Component {
  state = { showSideMenu: false };

  SideMenuClosedHandler = () => {
    this.setState({ showSideMenu: false });
  };

  SideMenuToggleHandler = () => {
    this.setState(prevState => {
      return { showSideMenu: !prevState.showSideMenu };
    });
  };

  render() {
    return (
      <Fragment>
        <TopMenu
          isAuth={this.props.isAuthenticated}
          MenuToggleClicked={this.SideMenuToggleHandler}
        />
        <SideMenu
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideMenu}
          closed={this.SideMenuClosedHandler}
        />
      </Fragment>
    );
  }
}

// const mapStateToProps = state => {
//   return { isAuthenticated: state.auth.token !== null };
// };

export default Menu;
