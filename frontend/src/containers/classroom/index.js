import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as R from 'ramda';
import { toast } from "react-toastify";

import {
  fetchProducts,
} from '../../actions'

import { 
  getActiveUser,
  getPurchases
} from '../../selectors'

class Classroom extends Component {

  componentDidMount () {
    this.props.fetchProducts()
  }

  renderProduct(product, index) {
    const shortDescription = `${R.take(100, product.description)}...`

    return (
        <div className="col-lg-12 my-4" key={index}>
          <div className="text-left text-grey">
            <h2 className="text-grey">
              <Link to={`/material/${product.slug}/`} style={{ textDecoration: 'none', color: "#B1B7BD" }}>
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
    const isEmpty = R.isEmpty(purchases);

    if (this.props.user.authenticated === false) {
       this.props.history.replace('/')
       toast.info("Please get authorized");
    }
    return (
      <div className='col-sm-12 col-lg-12 col-md-12 my-5'>
        <div className="row">
          <div className="col-lg-8">
            {isEmpty && 
              <div className="text-center text-grey">
                <h2>Your classroom is empty. You need to buy learning material</h2>
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


export default connect(mapStateToProps, mapDispatchToProps)(Classroom)