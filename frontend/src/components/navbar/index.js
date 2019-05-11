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
import DoneIcon from '@material-ui/icons/Done';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state/index';
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
      const link = (this.props.authenticated === false) ? `/` : `/cabinet`;
      const SelectClassroom = props => <Link to={link} {...props} 
            style={{ 
              textDecoration: 'none', 
              color: "white",
            }}/>

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

      const authClassroom = (
        <Nav className="ml-auto my-2">
          <Chip
            icon={<FaceIcon />}
            label="My classroom"
            clickable
            className={classes.chip}
            color="primary"
            component={SelectClassroom}
            deleteIcon={<DoneIcon />}
          />
        </Nav>
        )

      const guestClassroom = (
        <Nav className="ml-auto my-2">
          <Chip
              icon={<FaceIcon />}
              label={'My classroom'}
              clickable={false}
              className={classes.chip}
              color="secondary"
              component={SelectClassroom}
          />
        </Nav>
        )

      return (
        <React.Fragment>
          <Navbar expand="lg">
            <Navbar.Brand className="text-grey">
              <Link to='/' style={{ textDecoration: 'none', color: "#B1B7BD" }}>
              Practical Programming
              </Link>
            </Navbar.Brand>
            {this.props.user.authenticated ? authLinks : guestLinks}
          </Navbar>
          <Navbar expand="lg">
            {this.props.user.authenticated ? authClassroom : guestClassroom}
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
