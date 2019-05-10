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
} from '../../actions'

import { 
  getActiveUser,
  getPurchases
} from '../../selectors'

class Cabinet extends Component {

  componentDidMount () {
    this.props.fetchProducts()
  }

  renderProduct(product, index) {
    const shortDescription = `${R.take(100, product.description)}...`

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
          </div>
        </div>
    )
  }

  render () {
    const {purchases} = this.props;
    const isEmpty = R.isEmpty(purchases)
    return (
      <div className='col-sm-12 col-lg-12 col-md-12 my-5'>
        <div className="row">
          <div className="col-lg-8">
            {isEmpty && 
              <div className="text-center text-grey">
                <h2>You don't have any purchases</h2>
              </div>
            }
            {purchases.map((product, index) => this.renderProduct(product, index))}
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    user: getActiveUser(state),
    purchases: getPurchases(state, ownProps)
  }
}

const mapDispatchToProps = {
  fetchProducts
}


export default connect(mapStateToProps, mapDispatchToProps)(Cabinet)