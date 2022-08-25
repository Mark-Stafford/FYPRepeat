import {
  HOUSE_CREATE_FAIL,
  HOUSE_CREATE_REQUEST,
  HOUSE_CREATE_RESET,
  HOUSE_CREATE_SUCCESS,
  HOUSE_DELETE_FAIL,
  HOUSE_DELETE_REQUEST,
  HOUSE_DELETE_SUCCESS,
  HOUSE_EDIT_FAIL,
  HOUSE_EDIT_REQUEST,
  HOUSE_EDIT_SUCCESS,
  HOUSE_LIST_FAIL,
  HOUSE_LIST_REQUEST,
  HOUSE_LIST_SUCCESS,
  HOUSE_UPDATE_FAIL,
  HOUSE_UPDATE_REQUEST,
  HOUSE_UPDATE_RESET,
  HOUSE_UPDATE_SUCCESS,
} from "../Constants/HouseConstants";

// ALL HOUSES
export const houseListReducer = (state = { houses: [] }, action) => {
  switch (action.type) {
    case HOUSE_LIST_REQUEST:
      return { loading: true, houses: [] };
    case HOUSE_LIST_SUCCESS:
      return { loading: false, houses: action.payload };
    case HOUSE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// DELETE HOUSE
export const houseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case HOUSE_DELETE_REQUEST:
      return { loading: true };
    case HOUSE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case HOUSE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// DELETE HOUSE
export const houseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case HOUSE_CREATE_REQUEST:
      return { loading: true };
    case HOUSE_CREATE_SUCCESS:
      return { loading: false, success: true, house: action.payload };
    case HOUSE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case HOUSE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// EDIT HOUSE
export const houseEditReducer = (
  state = { house: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case HOUSE_EDIT_REQUEST:
      return { ...state, loading: true };
    case HOUSE_EDIT_SUCCESS:
      return { loading: false, house: action.payload };
    case HOUSE_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPDATE HOUSE
export const houseUpdateReducer = (state = { house: {} }, action) => {
  switch (action.type) {
    case HOUSE_UPDATE_REQUEST:
      return { loading: true };
    case HOUSE_UPDATE_SUCCESS:
      return { loading: false, success: true, house: action.payload };
    case HOUSE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case HOUSE_UPDATE_RESET:
      return { house: {} };
    default:
      return state;
  }
};
