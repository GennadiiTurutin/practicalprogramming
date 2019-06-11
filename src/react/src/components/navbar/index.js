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
import logo from './reactshop_logo.png';
import {  
  getActiveUser
} from '../../selectors';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
  },
});


class Navigation extends Component {

  onLogout = () => {
    this.props.logout()
  };
  

  render () {
      const { classes } = this.props;
      const authLinks = (
        <div className="containter">
          <Profile />
          <Button aria-label="Logout" 
                  className="text-grey" color="primary"
                  onClick={() => { this.onLogout() }} >
           <h5> Logout</h5>
          </Button>
        </div>
      );

      const guestLinks = (
          <div className="containter">
          <LoginDialog /> 
          <RegisterDialog /> 
          </div>
      );

      const authClassroom = (
          <Chip
            icon={<FaceIcon />}
            label="My Classroom"
            clickable
            className={classes.chip}
            color="default"
          />
        )

      const guestClassroom = (
          <Chip
              icon={<FaceIcon />}
              label="Not authorized"
              clickable={true}
              className={classes.chip}
              color="secondary"
          />
        )
      //const link = (this.props.user.authenticated === true) ? `/classroom` : `/`;
      const link = '/classroom'

      return (
        <React.Fragment>
          <Navbar collapseOnSelect expand="lg" variant="dark">
            <Navbar.Brand>
              <Link to='/'>
                <img
                  alt=""
                  src={logo}
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
                <Link to={link}
                      style={{ textDecoration: 'none', color: "white"}}>
                  {this.props.user.authenticated ? authClassroom : guestClassroom}
                </Link> 
              </Nav>   
            </Navbar.Collapse>
          </Navbar>
          <Navbar expand="sm">
            <Nav className="ml-auto">
              <Basket />
            </Nav>
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
