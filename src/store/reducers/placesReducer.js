import { updateObject } from "../../shared/utility";
import * as actionTypes from "../actions/actionTypes";

const initialState = {};

const fetchBuysStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchBuysSuccess = (state, action) => {
  const { properties, type } = action.payload;
  return updateObject(state, {
    [type]: updateObject(state[type], properties),
    loading: false
  });
};

const fetchBuysFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BUYS_START:
      return fetchBuysStart(state, action);
    case actionTypes.FETCH_BUYS_SUCCESS:
      return fetchBuysSuccess(state, action);
    case actionTypes.FETCH_BUYS_FAIL:
      return fetchBuysFail(state, action);
    default:
      return state;
  }
};

export default reducer;
