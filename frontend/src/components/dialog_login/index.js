import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { compose } from 'redux'
import TextField from '@material-ui/core/TextField';

import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import { login } from "../../actions";


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


class LoginDialog extends React.Component {
  state = {
    open: false,
    fullWidth: true,
    maxWidth: 'sm',
    email: "",
    password: "",
    showPassword: false,
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
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
    this.props.login(this.state.username, this.state.password)
    this.handleClose()
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
          Login
        </Button>
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="dialog">
          <DialogTitle id="dialog">Login</DialogTitle>
            <div className="container">
              <form className={classes.container}>
                  <TextField
                    id="username"
                    label="Username"
                    style={{ margin: 8 }}
                    fullWidth
                    value={this.state.username || ''}
                    onChange={this.handleUsernameChange}
                    margin="normal"
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
                    value={this.state.password || ''}
                    onChange={this.handlePasswordChange}
                    margin="normal"
                    variant="outlined"
                    type="password"
                    autoComplete="current-password"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
              </form>
            </div>
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

LoginDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
  login
}

export default compose(withStyles(styles), connect(null, mapDispatchToProps))(LoginDialog)
