import React from 'react'
import {connect} from 'react-redux'
import { Nav, Navbar } from 'react-bootstrap';
import { getTotalBasketCount } from '../../selectors';
import { Link } from 'react-router-dom';
import CartDialog from '../../components/dialog_cart';
import LoginDialog from '../../components/dialog_login';
import RegisterDialog from '../../components/dialog_register';
import Basket from '../../containers/basket'

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state/index';


const Navigation = ({totalBasketCount}) => {

  const isAuthenticated = false;

  const authLinks = (
    <Nav className="ml-auto">
      <Button aria-label="Classroom" color="primary" className="text-grey">
        Classroom
      </Button>
      <PopupState variant="popover" popupId="demo-popup-menu">
        {popupState => (
          <React.Fragment>
            <Button aria-label="Cabinet" className="text-grey" color="primary" 
                     {...bindTrigger(popupState)}>
              Gennadii
            </Button>
            <Menu {...bindMenu(popupState)}>
              <MenuItem onClick={popupState.close}>Profile</MenuItem>
              <MenuItem onClick={popupState.close}>Logout</MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    </Nav>
  );

  const guestLinks = (
    <Nav className="ml-auto">
      <div>
      <LoginDialog /> 
      <RegisterDialog /> 
      <CartDialog count={totalBasketCount}> 
        <Basket />
      </CartDialog>
      </div>
    </Nav>
  );

  return (
      <Navbar expand="lg">
        <Navbar.Brand className="text-grey">
          <Link to='/' style={{ textDecoration: 'none', color: "#B1B7BD" }}>
          Practical Programming
          </Link>
        </Navbar.Brand>
        {isAuthenticated ? authLinks : guestLinks}
      </Navbar>
  )
}



const mapStateToProps = state => {
  return {
    totalBasketCount: getTotalBasketCount(state),
    // auth: state.auth
  }
}

export default connect(mapStateToProps, null)(Navigation)
