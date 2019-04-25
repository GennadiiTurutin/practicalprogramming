import {
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCT_BY_ID_START,
  FETCH_PRODUCT_BY_ID_SUCCESS,
  FETCH_PRODUCT_BY_ID_FAILURE,
  ADD_PRODUCT_TO_BASKET,
  SEARCH_PRODUCT,
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  REMOVE_PRODUCT_FROM_BASKET,
  CLEAN_BASKET
} from '../actionTypes'
import {
  fetchProducts as fetchProductsApi,
  fetchProductById as fetchProductByIdApi,
  fetchCategories as fetchCategoriesApi,
} from '../api'

import axios from "axios";

export const fetchProducts = () => async dispatch => {
  dispatch({type: FETCH_PRODUCTS_START})

  try {
    const products = await fetchProductsApi()
    console.log('Products: ', products.data)
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
  }
}

export const addProductToBasket = id => dispatch => {
  dispatch({
    type: ADD_PRODUCT_TO_BASKET,
    payload: id
  })
}

export const searchProduct = text => dispatch => {
  dispatch({
    type: SEARCH_PRODUCT,
    payload: text
  })
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
  }
}

export const removeProductFromBasket = id => async dispatch => {
  dispatch({
    type: REMOVE_PRODUCT_FROM_BASKET,
    payload: id
  })
}

export const cleanBasket = () => dispatch => {
  dispatch({
    type: CLEAN_BASKET
  })
}

export const basketCheckout = products => () => {
  alert(JSON.stringify(products))
}