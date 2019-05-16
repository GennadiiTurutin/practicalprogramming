import React from 'react'
import {connect} from 'react-redux'
import * as R from 'ramda';
import { FaWindowClose } from 'react-icons/fa';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';

import {Elements, StripeProvider} from 'react-stripe-elements';
import Checkout from '../checkout';

import {
  getTotalBasketCount,
  getTotalBasketPrice,
  getBasketProductsWithCount
} from '../../selectors'

import {
  deleteProduct,
  cleanBasket, 
  basketCheckout
} from '../../actions'


const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing.unit,
  },
  badge: {
    top: '50%',
    right: -3,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class Basket extends React.Component {
  state = {
    open: false,
    fullWidth: true,
    maxWidth: 'md'
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCheckout = () => {
    this.props.basketCheckout(this.props.products);
  };

  handleDelete = () => {
    this.props.cleanBasket();
  };

  render() {
    const { classes } = this.props;
    const isBasketEmpty = R.isEmpty(this.props.products)

    return ( 
        <React.Fragment>
          <div className="text-center">
          <IconButton aria-label="Cart" color="primary" className="text-grey" onClick={this.handleClickOpen}>
            <Badge badgeContent={this.props.totalBasketCount} color="secondary" classes={{ badge: classes.badge }}>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          </div>

          <Dialog
            fullWidth={this.state.fullWidth}
            maxWidth={this.state.maxWidth}
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="dialog">

            <DialogTitle id="dialog">Shopping cart</DialogTitle>
            <DialogContent>
                <div className='view-container'>
                  <div className='container my-4'>
                    <div className='row'>
                      <div className='col-md-12'>
                        <div className='container my-4 text-center'>
                          {isBasketEmpty && 
                            <div className="container">
                              <h1>Your shopping cart is empty</h1>
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
                                  {this.props.products.map((product, index) => (
                                  <tbody key={index}>
                                    <tr>
                                      <td>{index + 1}</td>
                                      <td>{product.title}</td>
                                      <td>${product.price}</td>
                                      <td>{product.count}</td>
                                      <td>
                                      <FaWindowClose onClick={() => this.props.deleteProduct(product.id)} />
                                      </td>
                                    </tr>
                                  </tbody>  
                                  ))}
                                </Table>
                              </div>
                              <div className='container text-right'>
                                  <h4><b>Total: </b>
                                  ${this.props.totalPrice}
                                  </h4>
                              </div>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
        
            </DialogContent>
            <DialogActions>
            {!isBasketEmpty &&
              <div>
              <Checkout />
              <Fab color="primary" 
                   onClick={this.handleCheckout} 
                   aria-label="Add" 
                   className={classes.fab}>
                <DoneIcon />
              </Fab>
              <Fab color="secondary" 
                   onClick={this.handleDelete} 
                   aria-label="Delete" 
                   className={classes.fab}>
                <DeleteIcon />
              </Fab>
              </div>
            }
              <Fab color="secondary" 
                   onClick={this.handleClose} 
                   aria-label="Close" 
                   className={classes.fab}>
                <CloseIcon />
              </Fab>
            </DialogActions>
          </Dialog>
        </React.Fragment>
    )
  }
}


Basket.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
  products: getBasketProductsWithCount(state),
  totalPrice: getTotalBasketPrice(state),
  totalBasketCount: getTotalBasketCount(state)
  }
}

const mapDispatchToProps = {
  deleteProduct,
  cleanBasket, 
  basketCheckout
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Basket)