import * as R from 'ramda';

import {
	ADD_PRODUCT_TO_BASKET,
	DELETE_PRODUCT, 
	CLEAN_BASKET
} from '../actionTypes'

const initialState = []

export default (state = initialState, {type, payload}) => {
	switch (type) {
		case ADD_PRODUCT_TO_BASKET:
		  return R.append(payload, state)
		case DELETE_PRODUCT:
		  return R.without(R.of(payload), state)
		case CLEAN_BASKET:
		  return []
		default:
			return state
	}
}