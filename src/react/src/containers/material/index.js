import React, {Component} from 'react'
import {connect} from 'react-redux'
import { toast } from "react-toastify";
import { Redirect } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

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
          <ReactMarkdown source={product.content} escapeHtml={false}/>
        </div>
      </div>
    )
  }

  render () {
    const {product} = this.props

    const noMaterial = (product === undefined ) ? true : false
    if (noMaterial) {toast.info("Material doesn't exist!");}

    if (this.props.user.authenticated === false) {
       this.props.history.replace('/')
       toast.info("Please get authorized");
    }

    return (
        <div className="col-sm-12 col-lg-12 col-md-12 my-5">
           {product && this.renderProduct()}
           {noMaterial && <Redirect to='/classroom' />}
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
