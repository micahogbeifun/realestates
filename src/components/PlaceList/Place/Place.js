import React from "react";

import "./Place.css";

const Place = props => {
  const { city, state } = props.meta.tracking_params;
  const {
    photo,
    price,
    address,
    beds,
    baths,
    sqft,
    rdc_web_url,
    property_id
  } = props.property;
  //const regex = /[0-9, ,a-zA-Z]+ in/g;
  let regexp = /([0-9,a-z,A-Z,\s,-]+) in ([a-z,A-Z,\s,-]+), ([0-9]+)/g;
  let array = address ? regexp.exec(address) : null;
  const steetUrl = array ? array[1].split(" ").join("-") : null;
  const cityUrl = `${city.split(" ").join("-")}_${state}`;
  console.log(props.index);
  const idUrl = property_id
    ? `M${property_id.substring(0, 5)}-${property_id.substring(
        5,
        property_id.length
      )}`
    : null;
  const externalUrl = props.buy
    ? rdc_web_url
    : property_id
    ? `https://www.realtor.com/realestateandhomes-detail/${steetUrl}_${cityUrl}_${array[3]}_${idUrl}`
    : null;
  return (
    <a href={externalUrl} target="_blank" rel="noopener noreferrer">
      <div
        className="Place"
        style={{
          backgroundImage: `url(${
            photo ? photo : "/assets/images/no_image.png"
          })`
        }}
      >
        <div className="place-details">
          <p className="price">{price}</p>
          <p className="address">{address}</p>
          <div className="more-details">
            <p>{beds} bed</p>
            <p>{baths} baths</p>
            <p>{sqft}</p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default Place;
