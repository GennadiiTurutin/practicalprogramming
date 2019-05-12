import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as R from 'ramda';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import CheckIcon from '@material-ui/icons/Check';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import {
  fetchProducts,
  addProductToBasket,
  fetchCategories,
  deleteProduct,
  like
} from '../../actions'

import { 
  getProducts, 
  getActiveUser,
  getBasketProductsWithCount,
} from '../../selectors'

class Products extends Component {

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

  handleLike = (product) => {
    console.log(product)
    this.props.like(product);
  }

  componentDidMount () {
    this.props.fetchProducts()
    this.props.fetchCategories()
  }

  renderProduct(product, index) {
    const shortDescription = `${R.take(100, product.description)}...`
    const { user } = this.props;
    const productBought = this.handleProducts(product);
    const likes = R.length(product.likes)
    const liked = R.contains( user.id, product.likes)

    return (
        <div className="col-lg-12 my-4" key={index}>
          <div className="text-left text-grey">
            <h2 className="text-grey">
              <Link to={`/products/${product.slug}`} style={{ textDecoration: 'none', color: "#B1B7BD" }}>
                {product.title}
              </Link>
            </h2>
            <p>{shortDescription}</p>
            <h4>Price: ${product.price}</h4>

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
                label={`${likes} likes`}
                checked={liked}
                control={
                  <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} 
                  onClick={() => { this.handleLike(product) }} />
                }
              />

            </div>
          </div>
        </div>
    )
  }

  render () {
    const { user } = this.props;
    const { products } = this.props;
    const isEmpty = R.isEmpty(products)
    return (
      <div className='col-sm-12 col-lg-12 col-md-12 my-5'>
        <Header />
        <div className="row">
          <div className="col-lg-4">
            <Sidebar authenticated={ user.authenticated } />
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
    products: getProducts(state, ownProps),
    user: getActiveUser(state),
    basket: getBasketProductsWithCount(state)
  }
}

const mapDispatchToProps = {
  fetchProducts, 
  addProductToBasket,
  fetchCategories,
  deleteProduct,
  like
}


export default connect(mapStateToProps, mapDispatchToProps)(Products)