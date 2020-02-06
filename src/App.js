import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import Home from "./containers/Home/Home";

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/buy" component={Home} />
        <Route path="/rent" component={Home} />
        <Redirect to="/buy" />
      </Switch>
    );

    return <div className="App">{routes}</div>;
  }
}

export default withRouter(App);
