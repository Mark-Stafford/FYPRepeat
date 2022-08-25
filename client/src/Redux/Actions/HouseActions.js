import axios from "axios";
import {
  HOUSE_CREATE_REVIEW_FAIL,
  HOUSE_CREATE_REVIEW_REQUEST,
  HOUSE_CREATE_REVIEW_SUCCESS,
  HOUSE_DETAILS_FAIL,
  HOUSE_DETAILS_REQUEST,
  HOUSE_DETAILS_SUCCESS,
  HOUSE_LIST_FAIL,
  HOUSE_LIST_REQUEST,
  HOUSE_LIST_SUCCESS,
} from "../Constants/HouseConstants";
import { URL } from "../utils";
import { logout } from "./userActions";

// House LIST
export const listHouse =
  (keyword = " ", pageNumber = " ") =>
  async (dispatch) => {
    try {
      dispatch({ type: HOUSE_LIST_REQUEST });
      const { data } = await axios.get(
        `${URL}/api/houses?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      dispatch({ type: HOUSE_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: HOUSE_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// SINGLE HOUSE
export const listHouseDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: HOUSE_DETAILS_REQUEST });
    const { data } = await axios.get(`${URL}/api/houses/${id}`);
    dispatch({ type: HOUSE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: HOUSE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// HOUSE REVIEW CREATE
export const createHouseReview =
  (houseId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: HOUSE_CREATE_REVIEW_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`${URL}/api/houses/${houseId}/review`, review, config);
      dispatch({ type: HOUSE_CREATE_REVIEW_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: HOUSE_CREATE_REVIEW_FAIL,
        payload: message,
      });
    }
  };
