import {
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,

  FETCH_PRODUCT_BY_ID_START,
  FETCH_PRODUCT_BY_ID_SUCCESS,
  FETCH_PRODUCT_BY_ID_FAILURE,

  FETCH_PRODUCT_BY_SLUG_START,
  FETCH_PRODUCT_BY_SLUG_SUCCESS,
  FETCH_PRODUCT_BY_SLUG_FAILURE,

  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,

  FETCH_USER_BY_ID_START,
  FETCH_USER_BY_ID_SUCCESS,
  FETCH_USER_BY_ID_FAILURE,

  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,

  LOGOUT_USER_START,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,

  REGISTER_USER_START,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,

  LIKE_PRODUCT_START,
  LIKE_PRODUCT_SUCCESS,
  LIKE_PRODUCT_FAILURE,

  CHECKOUT_START,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAILURE,

  CHANGE_CREDENTIALS_START,
  CHANGE_CREDENTIALS_SUCCESS,
  CHANGE_CREDENTIALS_FAILURE,

  ADD_PRODUCT_TO_BASKET,
  DELETE_PRODUCT,
  CLEAN_BASKET,
  SEARCH_PRODUCT
} from '../actionTypes'
import { toast } from "react-toastify";
import {
  fetchProducts as fetchProductsApi,
  fetchProductById as fetchProductByIdApi,
  fetchProductBySlug as fetchProductBySlugApi,
  fetchProfileById as fetchProfileByIdApi,
  fetchCategories as fetchCategoriesApi,
  login as loginUserApi,
  register as registerUserApi,
  like as likeApi,
  checkout as checkoutApi,
  changeCredentials as changeCredentialsApi
} from '../api'

import axios from "axios";

export const fetchProducts = () => async dispatch => {
  dispatch({type: FETCH_PRODUCTS_START})
  try {
    const products = await fetchProductsApi()
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: products.data
    })
  } catch (err) {
    dispatch({
      type: FETCH_PRODUCTS_FAILURE,
      payload: err,
      error: true
    })
    toast.error("Server error. Try again later");
  }
}

export const fetchCategories = () => async dispatch => {
  dispatch({type: FETCH_CATEGORIES_START})
  try { 
    const categories =  await fetchCategoriesApi()
    dispatch({
        type: FETCH_CATEGORIES_SUCCESS,
        payload: categories.data
    })
  } catch (err) {
    dispatch({
      type: FETCH_CATEGORIES_FAILURE,
      payload: err,
      error: true
    })
    toast.error("Server error. Try again later");
  }
}

export const fetchProductById = id => async dispatch => {
  dispatch({type: FETCH_PRODUCT_BY_ID_START})
  try {
    const product = await fetchProductByIdApi(id)
    dispatch({
      type: FETCH_PRODUCT_BY_ID_SUCCESS,
      payload: product
    })
  } catch (err) {
    dispatch({
      type: FETCH_PRODUCT_BY_ID_FAILURE,
      payload: err,
      error: true
    })
    toast.error("Server error. Try again later");
  }
}

export const fetchProductBySlug = slug => async dispatch => {
  dispatch({type: FETCH_PRODUCT_BY_SLUG_START})
  try {
    const product = await fetchProductBySlugApi(slug)
    dispatch({
      type: FETCH_PRODUCT_BY_SLUG_SUCCESS,
      payload: product
    })
  } catch (err) {
    dispatch({
      type: FETCH_PRODUCT_BY_SLUG_FAILURE,
      payload: err,
      error: true
    })
    toast.error("Server error. Try again later");
  }
}

export const fetchProfileById = id => async dispatch => {
  dispatch({type: FETCH_USER_BY_ID_START})
  try {
    const user = await fetchProfileByIdApi(id)
    dispatch({
      type: FETCH_USER_BY_ID_SUCCESS,
      payload: user
    })
  } catch (err) {
    dispatch({
      type: FETCH_USER_BY_ID_FAILURE,
      payload: err,
      error: true
    })
    toast.error("Server error. Check your connection");
  }
}

export const deleteProduct = id => dispatch => {
  dispatch({
    type: DELETE_PRODUCT,
    payload: id
  })
  toast.info("The item has been deleted from the basket");
}

export const addProductToBasket = id => dispatch => {
  dispatch({
    type: ADD_PRODUCT_TO_BASKET,
    payload: id
  })
  toast.info("The item has been added to the basket");
}

export const searchProduct = text => dispatch => {
  dispatch({
    type: SEARCH_PRODUCT,
    payload: text
  })
}

export const cleanBasket = () => dispatch => {
  dispatch({
    type: CLEAN_BASKET
  })
  toast.info("Basket has been cleaned");
}

export const login = ( username, password ) => async dispatch => {
  dispatch({type: LOGIN_USER_START})
  try {
    const user = await loginUserApi(username, password)
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: user.data
    })
    toast.success("You've been successfully logged in");
  } catch (err) {
    dispatch({
      type: LOGIN_USER_FAILURE,
      payload: err,
      error: true
    })
    toast.error("Authorization error");
  }
}

export const register = ( username, email, password ) => async dispatch => {
  dispatch({type: REGISTER_USER_START})
  try {
    const user = await registerUserApi(username, email, password)
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: user.data
    })
    toast.success("You've been successfully registered");
  } catch (err) {
    dispatch({
      type: REGISTER_USER_FAILURE,
      payload: err,
      error: true
    })
    toast.error("Registration error");
  }
}

export const logout = () => (dispatch, getState) => {
  dispatch({type: LOGOUT_USER_START})
  dispatch({type: CLEAN_BASKET})
  try {
    axios.post("http://127.0.0.1:8000/auth/logout", null, tokenConfig(getState))
    dispatch({
      type: LOGOUT_USER_SUCCESS,
    })
    toast.success("You've been successfully logged out");
  } catch (err) {
    dispatch({
      type: LOGOUT_USER_FAILURE,
      payload: err,
      error: true
    })
    toast.error("Sorry, try again later!");
  }
}

const tokenConfig = getState => {
  const token = getState().authorization.token;
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
}


export const like = ( products, index ) => async dispatch => {
  dispatch({type: LIKE_PRODUCT_START})
  try {
    products = await likeApi(products, index)
    dispatch({
      type: LIKE_PRODUCT_SUCCESS,
      payload: products
    })
  } catch (err) {
    dispatch({
      type: LIKE_PRODUCT_FAILURE,
      payload: err,
      error: true
    })
    toast.error("Server error. Try again later");
  }
}

export const checkout = ( purchase ) => async dispatch => {
  dispatch({type: CHECKOUT_START})
  try {
    await checkoutApi(purchase)
    dispatch({
      type: CHECKOUT_SUCCESS
    })
    toast.success("Your purchase is successful");
  } catch (err) {
    dispatch({
      type: CHECKOUT_FAILURE,
      payload: err,
      error: true
    })
    toast.error("Purchase error");
  }
}


export const changeCredentials = ( id, username, email, password, token ) => async dispatch => {
  dispatch({type: CHANGE_CREDENTIALS_START})
  try {
    const user = await changeCredentialsApi(id, username, email, password, token)
    dispatch({
      type: CHANGE_CREDENTIALS_SUCCESS,
      payload: user.data
    })
    toast.success("You've successfully changed your credentials");
  } catch (err) {
    dispatch({
      type: CHANGE_CREDENTIALS_FAILURE,
      payload: err,
      error: true
    })
    toast.error("Credentials error");
  }
}
