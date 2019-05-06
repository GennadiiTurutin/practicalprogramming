import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import products from './products'
import productsPage from './productsPage'
import productPage from './productPage'
import basket from './basket'
import categories from './categories'
import authorization from './authorization'

export default combineReducers({
	routing: routerReducer,
	products,
	productsPage,
	productPage,
	basket,
	categories,
	authorization
})