import * as R from 'ramda';

import {
  FETCH_PRODUCTS_BY_USER_SUCCESS
} from '../actionTypes'


const initialState = {}

export default (state = initialState, {type, payload}) => {
	switch (type){              
    case FETCH_PRODUCT_BY_USER_SUCCESS:
      return R.merge(state, payload)
    default:
      return state
	}
}