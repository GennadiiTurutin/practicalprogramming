import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { checkout, payment } from "../../actions";
import {connect} from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import red from '@material-ui/core/colors/red';

import { 
  getActiveUser,
  getBasketProductsWithCount,
  getTotalBasketPrice
} from '../../selectors'

const stripeKey = `${process.env.REACT_APP_stripeKey}`

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: red[800],
    },
  },
});

class Checkout extends React.Component {

  onToken = (token, addresses) => {
      const { user } = this.props;
      const { products } = this.props;
      products.map((product) => user.products.push({"id": product.id}))
      this.props.handleClose()
      this.props.payment( token.id, this.props.totalPrice)
      this.props.checkout(user);
    };

  render() {


    const { classes } = this.props;

    return (
      <StripeCheckout
        billingAddress
        description="Payment"
        locale="auto"
        name="Praktikum.com"
        stripeKey={stripeKey}
        token={this.onToken}
        zipCode
        className={classes.iconHover} 
      />
    )
  }
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
  checkout,
  payment
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: getActiveUser(state),
    products: getBasketProductsWithCount(state),
    totalPrice: getTotalBasketPrice(state)
  }
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Checkout)