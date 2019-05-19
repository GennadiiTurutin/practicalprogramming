import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { register } from "../../actions";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  button: {
    margin: theme.spacing.unit,
    color: '#B1B7BD',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  dense: {
    marginTop: 16,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: red[800],
    },
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
    repeatPassword: "",
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
     this.setState({repeatPassword: e.target.value});
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  onSubmit = e => {
    this.props.register(this.state.username, this.state.email, this.state.password);
    this.handleClose()
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  componentDidMount() {
      ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
          if (value !== this.state.password) {
              return false;
          }
          return true;
      });
  }

  render() {
    const { classes } = this.props;
    if (this.props.isAuthenticated) {
      return <Redirect to='/' />;
    }

    return (
      <React.Fragment>
        <Button aria-label="Login" color="primary" onClick={this.handleClickOpen} className={classes.button}>
          <h5>Register</h5>
        </Button>
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="dialog">
          <DialogTitle id="dialog">Register</DialogTitle>
            <div className="container">
              <ValidatorForm className={classes.container} 
                    ref="form"
                    onSubmit={this.onSubmit}
                    autoComplete="off">
                    <TextValidator
                      id="username"
                      label="Username"
                      style={{ margin: 8 }}
                      placeholder="Preferred username"
                      margin="normal"
                      value={this.state.username}
                      onChange={this.handleUsernameChange}
                      variant="outlined"
                      validators={['required']}
                      errorMessages={['this field is required']}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextValidator
                      id="email"
                      label="Email"
                      style={{ margin: 8 }}
                      fullWidth
                      margin="normal"
                      value={this.state.email}
                      onChange={this.handleEmailChange}
                      variant="outlined"
                      validators={['required', 'isEmail']}
                      errorMessages={['this field is required', 'email is not valid']}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextValidator
                      id="password"
                      label="Password"
                      style={{ margin: 8 }}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      type="password"
                      validators={['required']}
                      errorMessages={['this field is required']}
                      value={this.state.password }
                      onChange={this.handlePasswordChange}
                      autoComplete="current-password"
                      helperText="Your password might include anything"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextValidator
                      id="confirmation"
                      label="Confirmation"
                      style={{ margin: 8 }}
                      placeholder="Confirm your password"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      value={this.state.repeatPassword}
                      onChange={this.handleConfirmationChange}
                      type="password"
                      autoComplete="current-password"
                      validators={['isPasswordMatch', 'required']}
                      errorMessages={['password mismatch', 'this field is required']}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
              <button style={{ padding: 0, border: 'none', background: 'none'}}>
                  <DoneIcon 
                    className={classes.iconHover} 
                    aria-label="Done"
                  />
              </button>
              <CloseIcon 
                className={classes.iconHover} 
                onClick={this.handleClose} 
                aria-label="Close"
              />
          </ValidatorForm>
          </div>
        </Dialog>
      </React.Fragment>
    );
  }
}

RegisterDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.authorization.isAuthenticated
});

const mapDispatchToProps = {
  register
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(RegisterDialog)
