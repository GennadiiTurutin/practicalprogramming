import * as R from 'ramda';
import products from './products'
import categories from './categories'
import axios from "axios";


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



//export const fetchProducts = () => (dispatch, getState) => {
  //axios.get("http://127.0.0.1:8000/products/")
//};
//


