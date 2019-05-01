import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { register } from "../../actions";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';

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
  button: {
    margin: theme.spacing.unit,
    color: '#B1B7BD',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class RegisterDialog extends React.Component {
  state = {
    open: false,
    fullWidth: true,
    maxWidth: 'sm',
    username: "",
    email: "",
    password: "",
    showPassword: false,
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleUsernameChange = e => {
     this.setState({username: e.target.value});
  }

  handleEmailChange = e => {
     this.setState({email: e.target.value});
  }

  handlePasswordChange = e => {
     this.setState({password: e.target.value});
  }

  handleConfirmationChange = e => {
     this.setState({confirmation: e.target.value});
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  onSubmit = e => {
    console.log(this.state.username, this.state.email, this.state.password)
    this.props.register(this.state.username, this.state.email, this.state.password);
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { classes } = this.props;

    if (this.props.isAuthenticated) {
      return <Redirect to='/' />;
    }

    return (
      <React.Fragment>
        <Button aria-label="Login" color="primary" onClick={this.handleClickOpen} className={classes.button}>
          Register
        </Button>
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="dialog">
          <DialogTitle id="dialog">Register</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <form className={classes.container} 
                    noValidate 
                    autoComplete="off">
                    <TextField
                      id="username"
                      label="Username"
                      style={{ margin: 8 }}
                      placeholder="Preferred username"
                      margin="normal"
                      value={this.state.username}
                      onChange={this.handleUsernameChange}
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      id="email"
                      label="Email"
                      style={{ margin: 8 }}
                      fullWidth
                      margin="normal"
                      value={this.state.email}
                      onChange={this.handleEmailChange}
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      id="password"
                      label="Password"
                      style={{ margin: 8 }}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      type="password"
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                      autoComplete="current-password"
                      helperText="Your password might include anything"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      id="confirmation"
                      label="Confirmation"
                      style={{ margin: 8 }}
                      placeholder="Confirm your password"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      value={this.state.confirmation}
                      onChange={this.handleConfirmationChange}
                      type="password"
                      autoComplete="current-password"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
              </form>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Fab color="primary" 
                 type="button"
                 aria-label="Add" 
                 onClick={this.onSubmit} 
                 className={classes.fab}>
              <DoneIcon />
            </Fab>
            <Fab color="secondary" 
                 onClick={this.handleClose} 
                 aria-label="Close" 
                 className={classes.fab}>
              <CloseIcon />
            </Fab>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

RegisterDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
  register
}

export default compose(
  withStyles(styles), connect(null, mapDispatchToProps))(RegisterDialog)
