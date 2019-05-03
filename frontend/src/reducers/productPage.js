import * as R from 'ramda';

import {
  FETCH_PRODUCT_BY_SLUG_SUCCESS,
} from '../actionTypes'

const initialState = {
  slug: null
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_PRODUCT_BY_SLUG_SUCCESS:
      return R.merge(state, {
  	    slug: R.prop('slug', payload)
      })
    default: 
      return state
  }
}
