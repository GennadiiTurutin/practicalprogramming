import {
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,

  FETCH_PRODUCT_BY_ID_START,
  FETCH_PRODUCT_BY_ID_SUCCESS,
  FETCH_PRODUCT_BY_ID_FAILURE,

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

  REMOVE_PRODUCT_FROM_BASKET,
  CLEAN_BASKET,
  ADD_PRODUCT_TO_BASKET,
  SEARCH_PRODUCT
} from '../actionTypes'
import {
  fetchProducts as fetchProductsApi,
  fetchProductById as fetchProductByIdApi,
  fetchUserById as fetchUserByIdApi,
  fetchCategories as fetchCategoriesApi,
  login as loginUserApi,
  register as registerUserApi,
  logout as logoutUserApi,
} from '../api'

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

export const fetchUserById = id => async dispatch => {
  dispatch({type: FETCH_USER_BY_ID_START})
  try {
    const user = await fetchUserByIdApi(id)
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

export const login = ( email, password ) => async dispatch => {
  dispatch({type: LOGIN_USER_START})
  try {
    const user = await loginUserApi(email, password)
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: user
    })
  } catch (err) {
    dispatch({
      type: LOGIN_USER_FAILURE,
      payload: err,
      error: true
    })
  }
}

export const register = ( username, email, password ) => async dispatch => {
  dispatch({type: REGISTER_USER_START})
  try {
    const user = await registerUserApi(username, email, password)
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: user
    })
  } catch (err) {
    dispatch({
      type: REGISTER_USER_FAILURE,
      payload: err,
      error: true
    })
  }
}

export const logout = () => async dispatch => {
  dispatch({type: LOGOUT_USER_START})
  try {
    await logoutUserApi()
    dispatch({
      type: LOGOUT_USER_SUCCESS,
    })
  } catch (err) {
    dispatch({
      type: LOGOUT_USER_FAILURE,
      payload: err,
      error: true
    })
  }
}
