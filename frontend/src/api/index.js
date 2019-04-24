import * as R from 'ramda';

import products from './products'
import categories from './categories'

export const fetchProducts = async () => {
	return new Promise(resolve => {
		resolve(products)
	})
}

export const fetchProductById = async id => {
	return new Promise((resolve, reject) => {
		const product = R.find(R.propEq('id', id), products)
		resolve(product)	
	})
}

export const fetchCategories = async () => {
	return new Promise(resolve => {
		resolve(categories)
	})
}
