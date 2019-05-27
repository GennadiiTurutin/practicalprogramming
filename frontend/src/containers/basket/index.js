import React from 'react'
import {connect} from 'react-redux'
import * as R from 'ramda';
import { FaWindowClose } from 'react-icons/fa';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import red from '@material-ui/core/colors/red';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkout from '../checkout';
import { toast } from "react-toastify";

import {
  getTotalBasketCount,
  getTotalBasketPrice,
  getActiveUser,
  getBasketProductsWithCount
} from '../../selectors'

import {
  deleteProduct,
  cleanBasket 
} from '../../actions'



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

class Basket extends React.Component {
  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
  }
  state = {
    open: false,
    fullWidth: true,
    maxWidth: 'sm'
  };
  
  handleClickOpen = () => {
    if (R.isEmpty(this.props.products)) { 
      toast.info("Your shopping cart is empty!");
    } else {
      this.setState({ open: true });
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = () => {
    this.props.cleanBasket();
  };

  render() {
    const { classes } = this.props;
    const { user } = this.props;
    const isBasketEmpty = R.isEmpty(this.props.products)
    const basketColor = (user.authenticated === false) ? "disabled" : "inherit"
    
    return ( 
        <React.Fragment>
          <IconButton aria-label="Cart" color="primary" className='text-grey' disabled={!user.authenticated} onClick={this.handleClickOpen}>
            <Badge badgeContent={this.props.totalBasketCount} color="secondary" classes={{ badge: classes.badge }}>
              <ShoppingCartIcon color={basketColor} />
            </Badge>
          </IconButton>
          
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
              <Checkout handleClose = {this.handleClose} /> 
              <DeleteIcon 
                className={classes.iconHover} 
                onClick={this.handleDelete} 
                aria-label="Delete"
              />
              </div>
            } 
              <CloseIcon 
                className={classes.iconHover} 
                onClick={this.handleClose} 
                aria-label="Close"
              />
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
  user: getActiveUser(state),
  totalBasketCount: getTotalBasketCount(state)
  }
}

const mapDispatchToProps = {
  deleteProduct,
  cleanBasket
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Basket)