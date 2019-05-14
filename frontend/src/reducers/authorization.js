import * as R from 'ramda';

import {
	LOGIN_USER_SUCCESS,
	LOGOUT_USER_SUCCESS, 
	REGISTER_USER_SUCCESS
} from '../actionTypes'

const initialState = {
	id: '',
	username: '',
	email: '',
	token: '',
	authenticated: false,
	products: ''
}

export default (state = initialState, {type, payload}) => {
	switch (type) {
		case LOGIN_USER_SUCCESS:
		  return R.merge(state, {
	  	    id: R.prop('id', payload),
	  	    username: R.prop('username', payload),
	  	    email: R.prop('email', payload),
	  	    products: R.prop('products', payload),
	  	    token: R.prop('token', payload),
	  	    authenticated: R.prop('authenticated', payload)
		  })
		case REGISTER_USER_SUCCESS:
	  	  return R.merge(state, {
	    	    id: R.prop('id', payload),
	    	    username: R.prop('username', payload),
	    	    email: R.prop('email', payload),
	    	    products: R.prop('products', payload),
	    	    token: R.prop('token', payload),
	    	    authenticated: R.prop('authenticated', payload)
	  	  })
		case LOGOUT_USER_SUCCESS:
		  return initialState
		default:
			return state
	}
}

