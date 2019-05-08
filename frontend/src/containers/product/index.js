import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as R from 'ramda';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import CheckIcon from '@material-ui/icons/Check';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import {
  fetchProductBySlug, 
  addProductToBasket,
  deleteProduct
} from '../../actions'

import {
  getProductBySlug,
  getActiveUser,
  getBasketProductsWithCount
} from '../../selectors';

import Sidebar from '../../components/sidebar';

class Product extends Component {

  handleBasket = (product) => {
    if (R.find(R.propEq('id', product.id))(this.props.basket)) {
      return true
    }
    else {
      return false
    }
  }

  handleProducts = (product) => {
    if (R.find(R.propEq('id', product.id))(this.props.user.products)!==undefined) {
      return true
    }
    else {
      return false
    }
  }

  handleClick = (product) => {
    if (this.handleBasket(product)) {
      this.props.deleteProduct(product.id)
    } 
    else {
      this.props.addProductToBasket(product.id)
    }
  }


  renderProduct () {
    const { product } = this.props
    const { user } = this.props;
    const productBought = this.handleProducts(product);
    return (
      <div className="container my-4 text-grey"> 
        <div className='form-group'>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <h2>${product.price}</h2>
        </div>
        <div className="container text-right">
          <FormControlLabel 
            disabled={!user.authenticated || productBought}
            checked={productBought || this.handleBasket(product)}
            control={
              <Checkbox 
              icon={<ShoppingCart />} 
              checkedIcon={<CheckIcon />} 
              onClick={() => { this.handleClick(product) }} />
            }
          />
          <FormControlLabel
            disabled={!user.authenticated}
            control={
              <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} 
              onClick={() => { console.log('Like') }} />
            }
          />

        </div>

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

const mapStateToProps = (state, ownProps) => {
  return {
    product: getProductBySlug(state, ownProps),
    user: getActiveUser(state),
    basket: getBasketProductsWithCount(state)
  }
}

const mapDispatchToProps = {
  fetchProductBySlug,
  addProductToBasket,
  deleteProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
