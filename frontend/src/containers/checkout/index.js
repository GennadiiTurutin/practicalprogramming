import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

export default class Checkout extends React.Component {
  onToken = (token, addresses) => {
      // TODO: Send the token information and any other
      // relevant information to your payment process
      // server, wait for the response, and update the UI
      // accordingly. How this is done is up to you. Using
      // XHR, fetch, or a GraphQL mutation is typical.
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