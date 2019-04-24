import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

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
});


class CartDialog extends React.Component {
  state = {
    open: false,
    fullWidth: true,
    maxWidth: 'lg'
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { count } = this.props;
    const { price } = this.props;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <IconButton aria-label="Cart" color="primary" className="text-grey" onClick={this.handleClickOpen}>
          <Badge badgeContent={count} color="primary" classes={{ badge: classes.badge }}>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="dialog">
          <DialogTitle id="dialog">Shopping cart</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.props.children}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button 
              onClick={this.handleClose}
              className='btn btn-outline-secondary'>
              Close
            </button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

CartDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CartDialog);