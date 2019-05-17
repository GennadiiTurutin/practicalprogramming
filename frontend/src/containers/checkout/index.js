import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { checkout } from "../../actions";
import {connect} from 'react-redux';

import { 
  getActiveUser,
  getBasketProductsWithCount
} from '../../selectors'

class Checkout extends React.Component {
  onToken = (token, addresses) => {
      const { user } = this.props;
      const { products } = this.props;
      products.map((product) => user.products.push({"id": product.id}))
      this.props.checkout(user);
    };

  render() {
    return (
      <StripeCheckout
        billingAddress
        description="Payment"
        locale="auto"
        name="Praktikum.com"
        stripeKey="pk_test_P4GDhrq8BnHwHHSFnxh29ZzG00Q7N0ZQ9J"
        token={this.onToken}
        zipCode
      />
    )
  }
}

const mapDispatchToProps = {
  checkout
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: getActiveUser(state),
    products: getBasketProductsWithCount(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
