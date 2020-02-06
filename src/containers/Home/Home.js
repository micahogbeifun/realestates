import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./Home.css";
import Menu from "../Menu/Menu";
import SearchBar from "../SearchBar/SearchBar";
import PlaceList from "../../components/PlaceList/PlaceList";

class Home extends Component {
  state = {
    limit: 20
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const position = ReactDOM.findDOMNode(this).getBoundingClientRect();
    //const arrived = position.y <= position.height / 2;
    const arrived = position.bottom <= window.innerHeight;

    this.setState(prevState => {
      const limit = arrived ? prevState.limit + 20 : prevState.limit;
      return { limit };
    });
  };

  render() {
    const buy = this.props.match.url === "/buy";
    return (
      <div className="Home">
        <Menu />
        <SearchBar />
        <PlaceList
          buy={buy}
          limit={this.state.limit}
          properties={
            this.props.properties[buy ? "list-for-sale" : "list-for-rent"]
          }
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    properties: state.places
  };
};

export default connect(mapStateToProps)(withRouter(Home));
