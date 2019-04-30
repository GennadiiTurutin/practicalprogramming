import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as R from 'ramda';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';
import {compose} from 'redux'
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';



import {
  fetchProducts,
  addProductToBasket,
  fetchCategories,
  removeProductFromBasket
} from '../../actions'

import {getProducts} from '../../selectors'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    color: green[600],
    '&$checked': {
      color: green[500],
      },
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },

});

class Products extends Component {
  state = {
     success: false,
     checked: true,
  };

  handleChange = name => event => {
      this.setState({ [name]: event.target.checked });
    };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleButtonClick = () => {
    if (!this.state.loading) {
      this.setState(
        {
          success: false,
          loading: true,
        },
        () => {
          this.timer = setTimeout(() => {
            this.setState({
              loading: false,
              success: true,
            });
          }, 1000);
        },
      );
    }
  };

  componentDidMount () {
    this.props.fetchProducts()
    this.props.fetchCategories()
  }

  renderProduct(product, index) {
    const {addProductToBasket} = this.props
    const shortDescription = `${R.take(100, product.description)}...`
    
    return (
        <div className="col-lg-12 my-4" key={index}>
          <div className="text-left text-grey">
            <h2 className="text-grey">
              <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: "#B1B7BD" }}>
                {product.title}
              </Link>
            </h2>
            <p>{shortDescription}</p>
            <h4>Price: ${product.price}</h4>

            <div className="container text-right">
              <FormControlLabel 
                control={
                  <Checkbox icon={<ShoppingCart  />} checkedIcon={<CheckIcon />} value="checkedH" 
                  onClick={() => { this.handleButtonClick(); addProductToBasket(product.id)}}/>
                }
              />
              <FormControlLabel 
                control={
                  <Checkbox icon={<DeleteIcon  />} checkedIcon={<DeleteIcon disabled />} value="checkedH" 
                  onClick={() => { this.handleButtonClick(); removeProductFromBasket(product.id)}}/>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} value="checkedH" />
                }
              />
            </div>
          </div>
      </div>
    )
  }

  render () {
    const {products} = this.props;
    const isEmpty = R.isEmpty(products)
    return (
      <div className='col-sm-12 col-lg-12 col-md-12 my-5'>
        <Header />
        <div className="row">
          <div className="col-lg-4">
            <Sidebar />
          </div>
          <div className="col-lg-8">
            {isEmpty && 
              <div className="text-center text-grey">
                <h2>Nothing found</h2>
              </div>
            }
            {products.map((product, index) => this.renderProduct(product, index))}
          </div>
        </div>
      </div>
    )
  }

}


const mapStateToProps = (state, ownProps) => {
  return {
    products: getProducts(state, ownProps)
  }
}

const mapDispatchToProps = {
  fetchProducts, 
  addProductToBasket,
  fetchCategories,
  removeProductFromBasket
}

Products.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles),connect(mapStateToProps, mapDispatchToProps))(Products)