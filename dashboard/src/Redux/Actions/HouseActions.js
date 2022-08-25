import {
  HOUSE_CREATE_FAIL,
  HOUSE_CREATE_REQUEST,  
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
  HOUSE_UPDATE_SUCCESS,
} from "../Constants/HouseConstants";
import axios from "axios";
import { logout } from "./userActions";

export const listHouses = () => async (dispatch, getState) => {
  try {
    dispatch({ type: HOUSE_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/houses/all`, config);

    dispatch({ type: HOUSE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: HOUSE_LIST_FAIL,
      payload: message,
    });
  }
};

// DELETE HOUSE
export const deleteHouse = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: HOUSE_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/houses/${id}`, config);

    dispatch({ type: HOUSE_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: HOUSE_DELETE_FAIL,
      payload: message,
    });
  }
};

// CREATE HOUSE
export const createHouse =
  (name, price, description, image, countInStock) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: HOUSE_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/houses/`,
        { name, price, description, image, countInStock },
        config
      );

      dispatch({ type: HOUSE_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: HOUSE_CREATE_FAIL,
        payload: message,
      });
    }
  };

// EDIT HOUSE
export const editHouse = (id) => async (dispatch) => {
  try {
    dispatch({ type: HOUSE_EDIT_REQUEST });
    const { data } = await axios.get(`/api/houses/${id}`);
    dispatch({ type: HOUSE_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: HOUSE_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE HOUSE
export const updateHouse = (house) => async (dispatch, getState) => {
  try {
    dispatch({ type: HOUSE_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/houses/${house._id}`,
      house,
      config
    );

    dispatch({ type: HOUSE_UPDATE_SUCCESS, payload: data });
    dispatch({ type: HOUSE_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: HOUSE_UPDATE_FAIL,
      payload: message,
    });
  }
};
