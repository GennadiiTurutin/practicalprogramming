import React, {Component} from 'react'
import {connect} from 'react-redux'
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import {
  fetchProductBySlug, 
  addProductToBasket,
  deleteProduct
} from '../../actions'

import {getProductBySlug} from '../../selectors';

import Sidebar from '../../components/sidebar';

class Product extends Component {

  renderProduct () {
    const {product, addProductToBasket} = this.props
    return (
      <div className="container my-4 text-grey"> 
        <div className='form-group'>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <h2>${product.price}</h2>
        </div>
        <div className="container text-right">
          <FormControlLabel 
            control={
              <Checkbox icon={<ShoppingCart  />} checkedIcon={<CheckIcon />} value="checkedH" 
              onClick={() => addProductToBasket(product.id)}
              />
            }
          />
          <FormControlLabel 
            control={
              <Checkbox icon={<DeleteIcon  />} checkedIcon={<DeleteIcon disabled />} value="checkedH" 
              onClick={() => deleteProduct(product.id)}
              />
            }
          />
          <FormControlLabel
            control={
              <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} value="checkedH" />
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
    product: getProductBySlug(state, ownProps)
  }
}

const mapDispatchToProps = {
  fetchProductBySlug,
  addProductToBasket,
  deleteProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
