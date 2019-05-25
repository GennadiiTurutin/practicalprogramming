import React, {Component} from 'react'
import {connect} from 'react-redux'
import { toast } from "react-toastify";

import {
  fetchProductBySlug
} from '../../actions'

import {
  getProductBySlug,
  getActiveUser
} from '../../selectors';

class Material extends Component {

  renderProduct () {
    const { product } = this.props

    return (
      <div className="container my-4 text-grey"> 
        <div className='form-group'>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>{product.content}</p>
        </div>
      </div>
    )
  }

  render () {
    const {product} = this.props
    if (this.props.user.authenticated === false) {
       this.props.history.replace('/')
       toast.info("Please get authorized");
    }
    return (
        <div className="col-sm-12 col-lg-12 col-md-12 my-5">
                {product && this.renderProduct()}
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    product: getProductBySlug(state, ownProps),
    user: getActiveUser(state),
  }
}

const mapDispatchToProps = {
  fetchProductBySlug
}

export default connect(mapStateToProps, mapDispatchToProps)(Material)
