import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Nav, Navbar } from 'react-bootstrap';
import { getTotalBasketCount } from '../../selectors';
import { Link } from 'react-router-dom';
import LoginDialog from '../../components/dialog_login';
import RegisterDialog from '../../components/dialog_register';
import Profile from '../../containers/profile';
import Basket from '../../containers/basket'

import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { logout } from "../../actions";
import { compose } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import indigo from '@material-ui/core/colors/indigo';
import { green } from '@material-ui/core/colors';
//import logo from '../../assets/reactshop_logo.png';
import {  
  getActiveUser
} from '../../selectors';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  button: {
    margin: theme.spacing.unit,
    color: '#B1B7BD',
  },
  chip: {
    margin: theme.spacing.unit,
    marginTop: 0,
  },
});


class Navigation extends Component {

  onLogout = () => {
    this.props.logout()
  };
  

  render () {
      const { classes } = this.props;

      const authLinks = (
        <div className="container-fluid">
          <Profile />
          <Button aria-label="Logout" 
                  color="primary"
                  className={classes.button}
                  onClick={() => { this.onLogout() }} >
           <h6>Logout</h6>
          </Button>
          <Link to='/classroom'
                style={{ textDecoration: 'none', color: "white"}}>
            <Chip
              icon={<FaceIcon />}
              label="My Classroom"
              clickable
              className={classes.chip}
              color="default"
             
            />
          </Link> 
          <Basket />
        </div>
      );

      const guestLinks = (
          <div className="container-fluid">
            <LoginDialog /> 
            <RegisterDialog /> 
            <Link to='/classroom'
                  style={{ textDecoration: 'none', color: "white"}}>
            <Chip
                icon={<FaceIcon />}
                label="Not authorized"
                clickable={true}
                className={classes.chip}
                color="secondary"
                style={{ backgroundColor: red[500] }}
            />
            </Link>
            <Basket />
          </div>
      );

      //const link = (this.props.user.authenticated === true) ? `/classroom` : `/`;

      return (
        <React.Fragment>
          <Navbar collapseOnSelect expand="lg" variant="dark">
            <Navbar.Brand>
              <Link to='/'>
                <img
                  alt=""
                  src={'https://s3.amazonaws.com/praktik.us/static/media/reactshop_logo.4169d542.png'}
                  width="300"
                  height="100"
                  className="d-inline-block align-top"
                />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                {this.props.user.authenticated ? authLinks : guestLinks}
              </Nav>   
            </Navbar.Collapse>
          </Navbar>
        </React.Fragment>
      )
    }
}
  
const mapStateToProps = state => {
  return {
    totalBasketCount: getTotalBasketCount(state),
    user: getActiveUser(state),
  }
}

const mapDispatchToProps = {
  logout
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Navigation)
