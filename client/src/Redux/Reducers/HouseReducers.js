import {
  HOUSE_CREATE_REVIEW_FAIL,
  HOUSE_CREATE_REVIEW_REQUEST,
  HOUSE_CREATE_REVIEW_RESET,
  HOUSE_CREATE_REVIEW_SUCCESS,
  HOUSE_DETAILS_FAIL,
  HOUSE_DETAILS_REQUEST,
  HOUSE_DETAILS_SUCCESS,
  HOUSE_LIST_FAIL,
  HOUSE_LIST_REQUEST,
  HOUSE_LIST_SUCCESS,
} from "../Constants/HouseConstants";

// HOUSE LIST
export const houseListReducer = (state = { houses: [] }, action) => {
  switch (action.type) {
    case HOUSE_LIST_REQUEST:
      return { loading: true, houses: [] };
    case HOUSE_LIST_SUCCESS:
      return {
        loading: false,
        pages: action.payload.pages,
        page: action.payload.page,
        houses: action.payload.houses,
      };
    case HOUSE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// SINGLE HOUSE
export const houseDetailsReducer = (
  state = { house: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case HOUSE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case HOUSE_DETAILS_SUCCESS:
      return { loading: false, house: action.payload };
    case HOUSE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// HOUSE REVIEW CREATE
export const houseCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case HOUSE_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case HOUSE_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case HOUSE_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case HOUSE_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
