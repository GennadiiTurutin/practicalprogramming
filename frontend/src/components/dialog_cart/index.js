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

import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';

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
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});


class CartDialog extends React.Component {
  state = {
    open: false,
    fullWidth: true,
    maxWidth: 'md'
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { count } = this.props;
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
            <Fab color="primary" 
                 onClick={this.handleClose} 
                 aria-label="Add" 
                 className={classes.fab}>
              <DoneIcon />
            </Fab>
            <Fab color="secondary" 
                 onClick={this.handleClose} 
                 aria-label="Delete" 
                 className={classes.fab}>
              <DeleteIcon />
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

CartDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CartDialog);