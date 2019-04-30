import * as R from 'ramda';
import products from './products'
import axios from "axios";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,

  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,

  LOGOUT_USER_START,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,

  REGISTER_USER_START,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,

} from "../actionTypes";

export const fetchProducts = async () => {
	return new Promise(resolve => {
		const response = axios.get("http://127.0.0.1:8000/products/")
		resolve(response)
	})
};

export const fetchProductById = async id => {
	return new Promise((resolve, reject) => {
		const product = R.find(R.propEq('id', id), products)
		resolve(product)	
	})
}

export const fetchCategories = async () => {
	return new Promise(resolve => {
		const response = axios.get("http://127.0.0.1:8000/categories/")
		resolve(response)
	})
};


export const fetchUserById = async id => {
	return new Promise(resolve => {
		const response = axios.get("http://127.0.0.1:8000/users/", id, '/')
		resolve(response)
	})
};



// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// LOGIN USER
export const login = (email, password) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body
  const body = JSON.stringify({ email, password });

  axios
    .post("http://127.0.0.1:8000/users/", body, config)
    //.post("/api/auth/login", body, config)
    .then(res => {
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: LOGIN_USER_FAILURE
      });
    });
};

// REGISTER USER
export const register = ({ username, password, email }) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body
  const body = JSON.stringify({ username, email, password });

  axios
    .post("/api/auth/register", body, config)
    .then(res => {
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: REGISTER_USER_FAILURE
      });
    });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  axios
    .post("/api/auth/logout/", null, tokenConfig(getState))
    .then(res => {
      dispatch({ type: 'CLEAR_USERS' });
      dispatch({
        type: LOGOUT_USER_SUCCESS
      });
    })
    .catch(err => {
      dispatch({
      	type: LOGOUT_USER_FAILURE
      });
    });
};

// Setup config with token - helper function
export const tokenConfig = getState => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};