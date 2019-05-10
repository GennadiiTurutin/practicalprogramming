import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Nav, Navbar } from 'react-bootstrap';
import { getTotalBasketCount } from '../../selectors';
import { Link } from 'react-router-dom';
import LoginDialog from '../../components/dialog_login';
import RegisterDialog from '../../components/dialog_register';
import Basket from '../../containers/basket'

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state/index';
import { logout } from "../../actions";
import {  
  getActiveUser
} from '../../selectors'

class Navigation extends Component {

  onLogout = () => {
    this.props.logout()
  };
  
  render () {
      const authLinks = (
        <Nav className="ml-auto my-2">
          <PopupState variant="popover" popupId="demo-popup-menu">
            {popupState => (
              <React.Fragment>
                <Button aria-label="Cabinet" className="text-grey" color="primary" 
                         {...bindTrigger(popupState)}>
                  {this.props.user.username}
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={popupState.close}>Profile</MenuItem>
                  <MenuItem onClick={this.onLogout}>Logout</MenuItem>
                </Menu>
                <Basket />
              </React.Fragment>
            )}
          </PopupState>
        </Nav>
      );

      const guestLinks = (
        <Nav className="ml-auto my-2">
          <LoginDialog /> 
          <RegisterDialog /> 
          <Basket />
        </Nav>
      );

      return (
          <Navbar expand="lg">
            <Navbar.Brand className="text-grey">
              <Link to='/' style={{ textDecoration: 'none', color: "#B1B7BD" }}>
              Practical Programming
              </Link>
            </Navbar.Brand>
            {this.props.user.authenticated ? authLinks : guestLinks}
          </Navbar>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
