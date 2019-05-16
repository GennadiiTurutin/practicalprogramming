import * as R from 'ramda';
import axios from 'axios';

export const fetchProducts = async () => {
	return new Promise(resolve => {
		const response = axios.get("http://127.0.0.1:8000/products/")
		resolve(response)
	})
};

export const fetchProductById = async (id, products) => {
	return new Promise((resolve, reject) => {
		const product = R.find(R.propEq('id', id), products)
		resolve(product)	
	})
}

export const fetchProductBySlug = async (slug, products)  => {
  return new Promise((resolve, reject) => {
    const product = R.find(R.propEq('slug', slug), products)
    resolve(product)  
  })
}

export const fetchProductsByUser = async username => {
  return new Promise((resolve, reject) => {
    const response = axios.get("http://127.0.0.1:8000/classroom/", username, '/')
    resolve(response)  
  })
}

export const fetchCategories = async () => {
	return new Promise(resolve => {
		const response = axios.get("http://127.0.0.1:8000/categories/")
		resolve(response)
	})
};


export const fetchProfileById = async id => {
	return new Promise(resolve => {
		const response = axios.get("http://127.0.0.1:8000/profiles/", id, '/')
		resolve(response)
	})
};

export const login = async ( username, password ) => {
  return new Promise(resolve => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({ username, password });
    const response = axios.post("http://127.0.0.1:8000/auth/login", body, config)
    resolve(response)
  })
};

export const register = async ( username, email, password ) => {
  return new Promise(resolve => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({ username, email, password });
    const response = axios.post("http://127.0.0.1:8000/auth/register/", body, config)
    resolve(response)
  })
};

export const like = async ( products, index ) => {

  return new Promise(resolve => {
    const product = products[Object.keys(products)[index]]
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const response = axios.put(`http://127.0.0.1:8000/products/${product.id}/`, product, config)
    resolve(response)
  })
};

export const checkout = async ( purchase ) => {
  return new Promise(resolve => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({ purchase });
    const response = axios.post("http://127.0.0.1:8000/checkout/", body, config)
    resolve(response)
  })
};