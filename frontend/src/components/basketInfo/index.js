import React from 'react'
import {connect} from 'react-redux'

import {
  getTotalBasketCount,
  getTotalBasketPrice
} from '../../selectors'

const BasketInfo = ({totalBasketCount, totalPrice}) => (
    <div className='container my-4'>
        <h2 className="text-grey">Shopping Cart</h2>
        <p className="text-grey">
        You have {totalBasketCount} in your cart. Total price: {totalPrice}
        </p>
    </div>
)

const mapStateToProps = state => {
  return {
    totalBasketCount: getTotalBasketCount(state),
    totalPrice: getTotalBasketPrice(state)
  }
}
export default connect(mapStateToProps, null)(BasketInfo)