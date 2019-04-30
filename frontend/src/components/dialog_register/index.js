import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

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

const titles = [
  {
    value: 'Mister',
    label: 'Mr.',
  },
  {
    value: 'Miss',
    label: 'Ms.',
  },
];

class RegisterDialog extends React.Component {
  state = {
    open: false,
    fullWidth: true,
    maxWidth: 'sm',
    username: "",
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

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
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
              autoComplete="off"
              id='my-form'>
                <TextField
                  id="firstname"
                  label="First Name"
                  style={{ margin: 8 }}
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="lastname"
                  label="Last Name"
                  style={{ margin: 8 }}
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="username"
                  label="Username"
                  style={{ margin: 8 }}
                  placeholder="Preferred username"
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="outlined-select-title"
                  select
                  label="Title"
                  style={{ margin: 8 }}
                  className={classes.textField}
                  value={this.state.title}
                  onChange={this.handleChange('title')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Please select your title"
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  {titles.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="email"
                  label="Email"
                  style={{ margin: 8 }}
                  fullWidth
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
                  margin="normal"
                  variant="outlined"
                  type="password"
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
                 type="submit"
                 form="my-form"
                 aria-label="Add" 
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

export default withStyles(styles)(RegisterDialog);