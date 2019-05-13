import React from 'react'
import {connect} from 'react-redux'

import {
  getTotalBasketCount,
  getTotalBasketPrice
} from '../../selectors'

const BasketInfo = ({totalBasketCount, totalPrice}) => (
    <div className='container my-4'>
        <h5 className="text-grey">SHOPPING CART</h5>
        <h6 className="text-grey text-left my-4">You have {totalBasketCount} items in your cart</h6> 
        <h6 className="text-grey text-left my-4">Total price: ${totalPrice}</h6>
    </div>
)

const mapStateToProps = state => {
  return {
    totalBasketCount: getTotalBasketCount(state),
    totalPrice: getTotalBasketPrice(state)
  }
}
export default connect(mapStateToProps, null)(BasketInfo)