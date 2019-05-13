import React, {Component} from 'react'
import {connect} from 'react-redux'

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
          <h2>${product.price}</h2>
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
                <h2>Some navidation panel</h2>
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
  }
}

const mapDispatchToProps = {
  fetchProductBySlug
}

export default connect(mapStateToProps, mapDispatchToProps)(Material)
