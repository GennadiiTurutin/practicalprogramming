import React from 'react'
import {connect} from 'react-redux'
import { Nav, Navbar, Button } from 'react-bootstrap';
import { getTotalBasketCount } from '../../selectors';
import { Link } from 'react-router-dom';
import CartDialog from '../../components/dialog_cart';
import Basket from '../../containers/basket'

const Navigation = ({totalBasketCount}) => {
  const isAuthenticated = false;

  const authLinks = (
    <Nav className="ml-auto">
      <Button variant="default" className="text-grey">
        Cabinet
      </Button>
      <Button variant="default" className="text-grey">
        Logout
      </Button>
      <Nav.Link variant="default" className="text-grey">
      Gennadii
      </Nav.Link>
      <Button variant="default">
        <CartDialog count={totalBasketCount}> 
           <Basket />
        </CartDialog>
      </Button>
    </Nav>
  );

  const guestLinks = (
    <Nav className="ml-auto">
      <Button variant="default" className="text-grey">
        Login
      </Button>
      <Button variant="default" className="text-grey">
        Register
      </Button>
      <Button variant="default">
        <CartDialog count={totalBasketCount}> 
           <Basket />
        </CartDialog>
      </Button>
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
