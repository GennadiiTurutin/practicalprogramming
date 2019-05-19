import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Nav, Navbar } from 'react-bootstrap';
import { getTotalBasketCount } from '../../selectors';
import { Link } from 'react-router-dom';
import LoginDialog from '../../components/dialog_login';
import RegisterDialog from '../../components/dialog_register';
import Basket from '../../containers/basket'

import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { logout } from "../../actions";
import { compose } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import {  
  getActiveUser
} from '../../selectors'

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
      const SelectCategory = props => <Link to='/profile' {...props} /> 
       

      const authLinks = (
        <Nav className="ml-auto my-2">
        <div className="containter">
          <Button aria-label="Profile" 
                  component={SelectCategory}
                  className="text-grey" color="primary" >
            <h5>{this.props.user.username}</h5>
          </Button>
          <Button aria-label="Logout" 
                  className="text-grey" color="primary"
                  onClick={() => { this.onLogout() }} >
           <h5> Logout</h5>
          </Button>
        </div>
        </Nav>
      );

      const guestLinks = (
        <Nav className="ml-auto">
          <div className="containter">
          <LoginDialog /> 
          <RegisterDialog /> 
          </div>
        </Nav>
      );

      const authClassroom = (
          <Chip
            icon={<FaceIcon />}
            label="My classroom"
            clickable
            className={classes.chip}
            color="primary"
          />
        )

      const guestClassroom = (
          <Chip
              icon={<FaceIcon />}
              label="My classroom"
              clickable={false}
              className={classes.chip}
              color="secondary"
          />
        )
      const link = (this.props.user.authenticated === true) ? `/classroom` : `/`;

      return (
        <React.Fragment>
          <Navbar expand="lg">
            <Navbar.Brand className="text-grey">
              <Link to='/' style={{ textDecoration: 'none', color: "#B1B7BD" }}>
              <h1>Praktikum</h1>
              </Link>
            </Navbar.Brand>
            {this.props.user.authenticated ? authLinks : guestLinks}
          </Navbar>
          <Navbar expand="sm">
            <Nav className="ml-auto">
              <Link to={link}
                    style={{ textDecoration: 'none', color: "white"}}>
                {this.props.user.authenticated ? authClassroom : guestClassroom}
              </Link>
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
