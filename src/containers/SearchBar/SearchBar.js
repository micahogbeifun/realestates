import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import "./SearchBar.css";
import { fetchBuys } from "../../store/actions/places";

class SearchBar extends Component {
  componentDidMount() {
    console.log(this.state.searchType);
    this.props.fetchBuys(this.state.searchType, {
      city: "Los Angeles",
      state_code: "CA"
    });
  }
  state = {
    searchType:
      this.props.match.url === "/buy" ? "list-for-sale" : "list-for-rent",
    searchForm: {
      search: {
        name: "search",
        value: "",
        placeholder: "US City",
        showDropDown: false,
        error: false,
        suggestions: []
      },
      price: {
        name: "price",
        value: "",
        placeholder: "Price",
        icon: "arrow-dropdown",
        min: "",
        max: ""
      },
      type: {
        name: "type",
        value: "",
        placeholder: "Type",
        icon: "arrow-dropdown",
        types: [
          { label: "Single Family", selected: false },
          { label: "Multi Family", selected: false },
          { label: "Condo", selected: false },
          { label: "Mobile", selected: false },
          { label: "Farm", selected: false },
          { label: "Land", selected: false }
        ]
      },
      bed: {
        name: "bed",
        value: "",
        placeholder: "Beds",
        icon: "arrow-dropdown",
        min: "",
        max: ""
      },
      baths: {
        name: "baths",
        value: "",
        placeholder: "Baths",
        icon: "arrow-dropdown",
        min: "",
        max: ""
      },
      save: {
        name: "save",
        placeholder: "Save Search"
      }
    },
    error: true
  };
  typeSelect = typeIndex => {
    const searchForm = { ...this.state.searchForm };

    searchForm.type.types.forEach((type, index) => {
      if (index === typeIndex) {
        type.selected = true;
        searchForm.type.value = searchForm.type.types[index].label
          .split(" ")
          .join("_")
          .toLowerCase();
      } else {
        type.selected = false;
      }
    });
    this.setState({ searchForm });
    this.switchIcon("type");
  };
  componentDidUpdate = (prevProps, prevState) => {
    const prevForm = { ...prevState.searchForm };
    const newForm = { ...this.state.searchForm };
    if ("" !== newForm.search.value && !newForm.search.showDropDown) {
      newForm.search.showDropDown = true;
      this.setState({ searchForm: newForm });
    }
    if ("" === newForm.search.value && prevForm.search.showDropDown) {
      newForm.search.showDropDown = false;
      this.setState({ searchForm: newForm });
    }
    if (prevProps.match.url !== this.props.match.url) {
      this.setState({
        searchType:
          this.props.match.url === "/buy" ? "list-for-sale" : "list-for-rent"
      });
    }
    if (prevState.searchType !== this.state.searchType) {
      this.props.fetchBuys(this.state.searchType, {
        city: "Los Angeles",
        state_code: "CA"
      });
    }
    console.log(this.props.match);
  };
  onSubmitHandler = () => {
    this.switchIcon("clear");
    const { searchForm } = this.state;

    const place = searchForm.search.suggestions.find(
      suggestion => suggestion.description === searchForm.search.value
    );
    const city = place.terms[0].value;
    const state_code = place.terms[1].value;
    const keyArray = ["city", "state_code"];
    const valueArray = [city, state_code];
    for (let key in searchForm) {
      if (key !== "search" && key !== "save") {
        switch (key) {
          case "baths":
            if (searchForm[key].min !== "") {
              keyArray.push("baths_min");
              valueArray.push(searchForm[key].min);
            }
            if (searchForm[key].max !== "") {
              keyArray.push("baths_max");
              valueArray.push(searchForm[key].max);
            }
            break;
          case "bed":
            if (searchForm[key].min !== "") {
              keyArray.push("beds_min");
              valueArray.push(searchForm[key].min);
            }
            if (searchForm[key].max !== "") {
              keyArray.push("beds_max");
              valueArray.push(searchForm[key].max);
            }
            break;
          case "price":
            if (searchForm[key].min !== "") {
              keyArray.push("price_min");
              valueArray.push(searchForm[key].min);
            }
            if (searchForm[key].max !== "") {
              keyArray.push("price_max");
              valueArray.push(searchForm[key].max);
            }
            break;
          default:
        }
      }
    }
    if (searchForm.type.value !== "") {
      keyArray.push("prop_type");
      valueArray.push(searchForm.type.value);
    }
    const data = {};
    keyArray.forEach((key, index) => (data[key] = valueArray[index]));
    console.log(data);
    this.props.fetchBuys(this.state.searchType, data);
  };
  validCity = value => {
    const { suggestions } = this.state.searchForm.search;
    const array = [];
    for (let key in suggestions) {
      array.push(suggestions[key].description);
    }
    return array.includes(value);
  };
  validate = () => {
    const searchForm = { ...this.state.searchForm };
    let formValid = true;
    for (let key in searchForm) {
      if (searchForm[key].name === "search") {
        formValid = formValid && this.validCity(searchForm.search.value);
        formValid = formValid && searchForm.search.value !== "";
        if (!formValid) {
          searchForm.search.value = "";
          searchForm.search.error = true;
          searchForm.search.placeholder = "Please enter a Valid City";
        } else {
          searchForm.search.error = false;
          searchForm.search.placeholder = "US City";
        }
      }
      if (
        searchForm[key].name !== "type" &&
        searchForm[key.name !== "search"]
      ) {
        if (searchForm[key].min !== "") {
          formValid =
            formValid &&
            !isNaN(searchForm[key].min) &&
            parseInt(searchForm[key].min, 10) >= 0;
          if (!formValid) {
            searchForm[key].min = "";
          }
        }
        if (searchForm[key].max !== "") {
          formValid =
            formValid &&
            !isNaN(searchForm[key].max) &&
            parseInt(searchForm[key].max, 10) >= 0;
          if (!formValid) {
            searchForm[key].max = "";
          }
        }
      }
    }
    if (formValid) {
      this.onSubmitHandler();
    }
    this.setState({ searchForm, error: !formValid });
  };
  inputChangedHandler = (event, inputIdentifier, param) => {
    event.preventDefault();
    const searchForm = { ...this.state.searchForm };

    if (inputIdentifier === "search") {
      searchForm[inputIdentifier].value = event.target.value;
    } else {
      searchForm[inputIdentifier][param] = event.target.value;
    }

    this.setState({ searchForm });
  };
  handleChange = address => {
    this.setState({
      searchForm: {
        ...this.state.searchForm,
        search: {
          ...this.state.searchForm.search,
          value: address,
          error: false
        }
      }
    });
  };
  handleSearchSelect = address => {
    this.setState({
      searchForm: {
        ...this.state.searchForm,
        search: { ...this.state.searchForm.search, value: address }
      }
    });
  };
  setSearch = address => {
    const searchForm = { ...this.state.searchForm };
    searchForm.search.value = address;
    this.setState({ searchForm });
  };
  switchIcon = name => {
    if (name !== "clear") {
      this.setState(prevState => {
        let searchForm = { ...prevState.searchForm };

        let down = searchForm[name].icon === "arrow-dropdown";
        for (let key in searchForm) {
          searchForm[key].icon =
            key !== name || !down ? "arrow-dropdown" : "arrow-dropup";
        }
        //   searchForm[name].icon = down ? "arrow-dropup" : "arrow-dropdown";
        return { searchForm };
      });
    } else {
      let searchForm = { ...this.state.searchForm };

      for (let key in searchForm) {
        searchForm[key].icon = "arrow-dropdown";
      }
      this.setState({ searchForm });
    }
  };
  updateSuggestions = suggestions =>
    this.setState({
      searchForm: {
        ...this.state.searchForm,
        search: { ...this.state.searchForm.search, suggestions }
      }
    });
  renderOptions = name => {
    const { searchForm } = this.state;
    let dropped;
    switch (name) {
      case "type":
        dropped = searchForm[name].icon !== "arrow-dropdown";
        const style = { backgroundColor: "#53dad5", color: "#fff" };
        return (
          <div
            className="Dropdown"
            style={{
              display: `${dropped ? "inline-block" : "none"}`,
              width: "150px"
            }}
          >
            {searchForm.type.types.map((type, index) => (
              <div
                key={index}
                className={"InputWrapper " + name + " " + index}
                style={type.selected ? style : null}
                onClick={() => this.typeSelect(index)}
              >
                {type.label}
              </div>
            ))}
          </div>
        );

      default:
        dropped = searchForm[name].icon !== "arrow-dropdown";
        return (
          <div
            className="Dropdown"
            style={{ display: `${dropped ? "flex" : "none"}` }}
          >
            <div className={"InputWrapper " + name + " 1"}>
              <input
                value={searchForm[name.min]}
                type="text"
                placeholder={name === "price" ? "$ from" : "from"}
                onChange={event => this.inputChangedHandler(event, name, "min")}
              />
            </div>
            <div className={"InputWrapper " + name + " 2"}>
              <input
                value={searchForm[name.max]}
                type="text"
                placeholder={name === "price" ? "$ to" : "to"}
                onChange={event => this.inputChangedHandler(event, name, "max")}
              />
            </div>
          </div>
        );
    }
  };

  render() {
    const searchForm = { ...this.state.searchForm };
    const formArray = [];
    for (let key in searchForm) {
      formArray.push({
        ...searchForm[key]
      });
    }
    return (
      <div className="SearchBar">
        <div className="InputWrapper Query">
          <PlacesAutocomplete
            value={searchForm.search.value}
            onChange={this.handleChange}
            onSelect={this.handleSearchSelect}
            searchOptions={{
              types: [`(cities)`],
              componentRestrictions: { country: "usa" }
            }}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading
            }) => (
              <Fragment>
                <input
                  onClick={() => this.switchIcon("clear")}
                  {...getInputProps({
                    spellCheck: "false",
                    placeholder: `${searchForm.search.placeholder}`,
                    className: `${searchForm.search.error ? "Error" : "Input"}`
                  })}
                />
                <div
                  className="Dropdown"
                  style={{
                    display: `${suggestions.length >= 1 ? "flex" : "none"}`,
                    flexDirection: "column"
                  }}
                >
                  {searchForm.search.suggestions !== suggestions &&
                  suggestions.length >= 1
                    ? this.updateSuggestions(suggestions)
                    : null}
                  {suggestions.map(suggestion => {
                    return (
                      <div
                        key={suggestion.placeId}
                        className="InputWrapper search"
                        {...getSuggestionItemProps(suggestion)}
                      >
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </Fragment>
            )}
          </PlacesAutocomplete>
          <span
            className="clearBtn"
            onClick={() => this.setSearch("")}
            style={{
              display: `${searchForm.search.value === "" ? "none" : "flex"}`
            }}
          >
            <ion-icon name="close"></ion-icon>
          </span>
          <span className="SearchBtn" onClick={this.validate}>
            <ion-icon name="search"></ion-icon>
          </span>
        </div>
        <div className="Params">
          {formArray.slice(1, formArray.length - 1).map(el => {
            return (
              <div key={el.name} className={"InputWrapper " + el.placeholder}>
                {el.name === "price" ? "$ " : null}
                {el.placeholder}{" "}
                <span onClick={() => this.switchIcon(el.name)}>
                  <ion-icon name={el.icon}></ion-icon>
                </span>
                {this.renderOptions(el.name)}
              </div>
            );
          })}
          {/* <div
            className={
              "InputWrapper " + searchForm.save.placeholder.split(" ")[0]
            }
          >
            {searchForm.save.placeholder}{" "}
          </div> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    properties: state.places
  };
};

export default connect(mapStateToProps, { fetchBuys })(withRouter(SearchBar));
