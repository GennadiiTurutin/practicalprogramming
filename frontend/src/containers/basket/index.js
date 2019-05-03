import React from 'react'
import {connect} from 'react-redux'
import * as R from 'ramda';
import { FaWindowClose } from 'react-icons/fa';
import { Table } from 'react-bootstrap';
import CartDialog from '../../components/dialog_cart';

import {
  getTotalBasketCount,
  getTotalBasketPrice,
  getBasketProductsWithCount
} from '../../selectors'

import {
  removeProductFromBasket,
  cleanBasket, 
  basketCheckout
} from '../../actions'


const Basket = (
  { products, 
    totalPrice, 
    removeProductFromBasket, 
    cleanBasket, 
    basketCheckout, 
    totalBasketCount,
  }
  ) => {

  const isBasketEmpty = R.isEmpty(products)

  return (
    <div className='container my-4'>

    <CartDialog count={totalBasketCount} price={totalPrice}> 
     <div className='view-container'>
       <div className='container my-4'>
         <div className='row'>
           <div className='col-md-12'>
             <div className='container my-4 text-center'>
               {isBasketEmpty && 
                 <div className="container">
                   Your shopping cart is empty
                 </div>
               }
               
               { R.not(isBasketEmpty) &&
                 <div>
                   <div className='container py-4'>
                     <Table striped bordered hover size="sm" variant="light">
                       <thead>
                         <tr>
                           <th>#</th>
                           <th>Item</th>
                           <th>Price</th>
                           <th>Amount</th>
                           <th>Delete</th>
                         </tr>
                       </thead>
                       {products.map((product, index) => (
                       <tbody key={index}>
                         <tr>
                           <td>{index + 1}</td>
                           <td>{product.title}</td>
                           <td>${product.price}</td>
                           <td>{product.count}</td>
                           <td>
                           <FaWindowClose onClick={() => removeProductFromBasket(product.id)} />
                           </td>
                         </tr>
                       </tbody>  
                       ))}
                     </Table>
                   </div>
                   <div className='container text-right'>
                       <h4><b>Total: </b>
                       ${totalPrice}
                       </h4>
                   </div>
                   <div class="container text-right">
                       <button className='btn btn-outline-danger mr-2 my-4'
                               onClick={() => cleanBasket()}>
                         Clean cart
                       </button>
                       <button 
                         onClick={() => basketCheckout(products)}
                         className='btn btn-outline-success my-4'>
                         Checkout
                       </button>
                   </div>
                 </div>
               }
             </div>
           </div>
         </div>
       </div>
     </div>
     </CartDialog>
     </div>
  )
}

const mapStateToProps = state => {
  return {
  products: getBasketProductsWithCount(state),
  totalPrice: getTotalBasketPrice(state),
  totalBasketCount: getTotalBasketCount(state)
  }
}

const mapDispatchToProps = {
  removeProductFromBasket,
  cleanBasket, 
  basketCheckout
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket)