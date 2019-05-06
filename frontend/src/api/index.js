import * as R from 'ramda';
import products from './products'
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

export const fetchProductBySlug = async slug => {
  return new Promise((resolve, reject) => {
    const product = R.find(R.propEq('slug', slug), products)
    resolve(product)  
  })
}

export const fetchCategories = async () => {
	return new Promise(resolve => {
		const response = axios.get("http://127.0.0.1:8000/categories/")
		resolve(response)
	})
};


export const fetchUserById = async id => {
	return new Promise(resolve => {
		const response = axios.get("http://127.0.0.1:8000/users/", id, '/')
		resolve(response)
	})
};

export const fetchProductsForProfile = async id => {
  return new Promise(resolve => {
    const response = axios.get("http://127.0.0.1:8000/users/", id, '/')
    resolve(response)
  })
};


export const loadUser = async id => {
  return new Promise(resolve => {
    const response = axios.get("http://127.0.0.1:8000/users/", id, '/')
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

export const logout = async () => {
  return new Promise(resolve => {
    const response = axios.post("http://127.0.0.1:8000/auth/logout", null, tokenConfig())
    resolve(response)
  })
}; 

export const tokenConfig = () => getState => {
  const token = getState().auth.token;
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};