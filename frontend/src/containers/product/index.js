import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {fetchProductById, addProductToBasket} from '../../actions'
import {getProductById} from '../../selectors';

import Sidebar from '../../components/sidebar';

class Product extends Component {
  componentDidMount () {
    this.props.fetchProductById(this.props.match.params.id)
  }

  
  renderProduct () {
    const {product, addProductToBasket} = this.props
    return (
      <div className="container my-4 text-grey"> 
        <div className='form-group'>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <h2>${product.price}</h2>
        </div>

        <button 
          onClick={() => addProductToBasket(product.id)}
          className='btn btn-outline-success mr-2 my-4'>
          Add to cart
        </button>
        <Link 
          to='/'
          className='btn btn-outline-secondary mx-2 my-4'>
          Back to store
        </Link>

      </div>
    )
  }

  render () {
    const {product} = this.props
    return (
        <div className="col-sm-12 col-lg-12 col-md-12 my-5">
            <div className="row">
              <div className="col-lg-4">
                <Sidebar />
              </div>
              <div className="col-lg-8">
                {product && this.renderProduct()}
              </div>
            </div>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: getProductById(state, state.productPage.id)
  }
}

const mapDispatchToProps = {
  fetchProductById,
  addProductToBasket
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)