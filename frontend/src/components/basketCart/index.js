import React from 'react'
import {connect} from 'react-redux'
import CartDialog from '../../components/dialog_cart';
import Basket from '../../containers/basket'


import {
  getTotalBasketCount,
  getTotalBasketPrice
} from '../../selectors'

const BasketCart = ({totalBasketCount, totalPrice}) => (
    <div className='container my-4'>
      <CartDialog count={totalBasketCount} price={totalPrice}> 
         <Basket />
      </CartDialog>
    </div>
)

const mapStateToProps = state => {
  return {
    totalBasketCount: getTotalBasketCount(state),
    totalPrice: getTotalBasketPrice(state)
  }
}
export default connect(mapStateToProps, null)(BasketCart)