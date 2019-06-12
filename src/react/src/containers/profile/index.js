import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { compose } from 'redux'
import red from '@material-ui/core/colors/red';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import { changeCredentials } from "../../actions";
import {  getActiveUser } from '../../selectors';


const styles = theme => ({
  form: {
    isplay: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
    color: '#B1B7BD',
  },
  button2: {
    padding: 0, 
    border: 'none', 
    background: 'none'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    margin: 'auto',
    width: 300,
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
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});


class Profile extends React.Component {
  state = {
    open: false,
    maxWidth: 'sm',
    id: this.props.user.id,
    username: this.props.user.username,
    email: this.props.user.email,
    password: "",
    showPassword: false,
  };

  static propTypes = {
  	changeCredentials: PropTypes.func.isRequired,
    authenticated: PropTypes.bool
  };
  
  onLogout = () => {
    this.props.logout()
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  
  handleUsernameChange = e => {
     this.setState({username: e.target.value});
  }

  handlePasswordChange = e => {
     this.setState({password: e.target.value});
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  onSubmit = e => {
    this.props.changeCredentials(this.state.id, this.state.username, this.state.email, this.state.password, this.props.user.token)
    this.handleClose()
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Button aria-label="Profile" color="primary" onClick={this.handleClickOpen} className={classes.button}>
          <h6>{this.props.user.username}</h6>
        </Button>
        
        <Dialog
          maxWidth={this.state.maxWidth}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="dialog">
          <DialogTitle id="dialog">Profile</DialogTitle>
            <div className="container">            
              <ValidatorForm className={classes.container} 
                    ref="form"
                    onSubmit={this.onSubmit}
                    autoComplete="off">
                  <TextValidator
                    id="username"
                    label="Username"
                    className={classes.textField}
                    placeholder="Preferred username"
                    margin="normal"
                    value={this.state.username || ''}
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
                    className={classes.textField}
                    margin="normal"
                    value={this.state.email || ''}
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
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    type="password"
                    validators={['required']}
                    errorMessages={['this field is required']}
                    value={this.state.password || ''}
                    onChange={this.handlePasswordChange}
                    autoComplete="current-password"
                    helperText="Your password might include anything"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
            <div className="containet text-center">
              <button className={classes.button2} >
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
            </div>
          </ValidatorForm>
          </div>
        </Dialog>
      </React.Fragment>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
  authenticated: state.authorization.authenticated,
  user: getActiveUser(state),
});

const mapDispatchToProps = {
  changeCredentials
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Profile)
