import { realtor } from "../../apis/axios_properties";

import * as actionTypes from "./actionTypes";

const fetchBuysFail = error => {
  return {
    type: actionTypes.FETCH_BUYS_FAIL,
    payload: { error }
  };
};

const fetchBuysStart = () => {
  return {
    type: actionTypes.FETCH_BUYS_START
  };
};

const fetchBuysSuccess = (properties, type) => {
  return {
    type: actionTypes.FETCH_BUYS_SUCCESS,
    payload: { properties, type }
  };
};

export const fetchBuys = (type, data) => async dispatch => {
  dispatch(fetchBuysStart());
  try {
    const response = await realtor.get(`/${type}`, {
      params: {
        ...data
      },
      headers: {
        "x-rapidapi-host": actionTypes.HOST,
        "x-rapidapi-key": actionTypes.API_KEY
        // "X-RapidAPI-Key": actionTypes.APP_KEY,
      }
    });

    dispatch(fetchBuysSuccess(response.data, type));
  } catch (error) {
    dispatch(fetchBuysFail(error));
  }
};

// export const fetchBuys = data => {
//   var req = unirest(
//     "GET",
//     "https://realtor.p.rapidapi.com/properties/list-for-sale"
//   );

//   req.query({
//     price_min: "100000",
//     sort: "relevance",
//     radius: "10",
//     city: "Stonecrest",
//     offset: "0",
//     limit: "200",
//     state_code: "GA"
//   });

//   req.headers({
//     "x-rapidapi-host": "realtor.p.rapidapi.com",
//     "x-rapidapi-key": "f2f3566692mshcdab341787345fap1c0d84jsn07201cda98fc"
//   });

//   req.end(function(res) {
//     if (res.error) throw new Error(res.error);

//     console.log(res.body);
//   });
// };
