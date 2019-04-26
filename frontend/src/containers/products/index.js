import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as R from 'ramda';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';

import {
  fetchProducts,
  addProductToBasket,
  fetchCategories
} from '../../actions'

import {getProducts} from '../../selectors'


class Products extends Component {

  componentDidMount () {
    this.props.fetchProducts()
    this.props.fetchCategories()
  }

  renderProduct(product, index) {
    const {addProductToBasket} = this.props
    const shortDescription = `${R.take(100, product.description)}...`
    
    return (
        <div className="col-lg-12 my-4" key={index}>
          <div className="text-left text-grey">
            <h2 className="text-grey">
              <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: "#B1B7BD" }}>
                {product.title}
              </Link>
            </h2>
            <p>{shortDescription}</p>
            <h4>Price: ${product.price}</h4>
            <button 
              onClick={() => addProductToBasket(product.id)}
              className='btn btn-outline-success mr-2 my-4'>
              Buy Now!
            </button>
            <Link 
              to={`/products/${product.id}`}
              className='btn btn-outline-secondary mx-2 my-4'>
              More Info
            </Link>
          </div>
      </div>
    )
  }

  render () {
    const {products} = this.props;
    const isEmpty = R.isEmpty(products)
    return (
      <div className='col-sm-12 col-lg-12 col-md-12 my-5'>
        <Header />
        <div className="row">
          <div className="col-lg-4">
            <Sidebar />
          </div>
          <div className="col-lg-8">
            {isEmpty && 
              <div className="text-center text-grey">
                <h2>Nothing found</h2>
              </div>
            }
            {products.map((product, index) => this.renderProduct(product, index))}
          </div>
        </div>
      </div>
    )
  }

}


const mapStateToProps = (state, ownProps) => {
  return {
    products: getProducts(state, ownProps)
  }
}

const mapDispatchToProps = {
  fetchProducts, 
  addProductToBasket,
  fetchCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
