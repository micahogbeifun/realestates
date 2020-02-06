import React, { Fragment } from "react";
import { connect } from "react-redux";

import "./PlaceList.css";
import Place from "./Place/Place";
import Spinner from "../UI/Spinner/Spinner";

const PlaceList = props => {
  let items = <Spinner />;
  if (props.properties && !props.loading) {
    const { meta, listings } = props.properties;
    const propertiesArray = [];
    for (let key in listings)
      if (key < props.limit) propertiesArray.push(listings[key]);
    items = (
      <Fragment>
        <h1 className="place-title">
          {meta.tracking_params.searchCityState} Properties
          {meta.tracking_params.channel === "for_sale"
            ? " For Sale"
            : "for_rent"
            ? " For Rent"
            : null}
        </h1>
        <div className="ListGrid">
          {propertiesArray.map(property => (
            <Place
              loading={props.loading}
              meta={meta}
              buy={props.buy}
              key={property.property_id}
              property={property}
            />
          ))}
        </div>
      </Fragment>
    );
  }
  return <div className="PlaceList">{items}</div>;
};

const mapStateToProps = state => {
  return { loading: state.places.loading };
};

export default connect(mapStateToProps)(PlaceList);
