import React from 'react'
import BasketInfo from '../../components/basketInfo'
import Search from '../../components/search'
import Categories from '../../components/categories'
import Basket from '../../containers/basket'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

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


function handleDelete() {
  alert('You clicked the delete icon.'); 
}

function handleClick() {
  alert('You clicked the Chip.'); // eslint-disable-line no-alert
}

const Sidebar = (props) => {
  const { classes } = props;
  return (
    <div>
      <div className="container text-left text-grey">
        <Chip
          icon={<FaceIcon />}
          label="My cabinet"
          onDelete={handleDelete}
          className={classes.chip}
          color="secondary"
        />
        <Chip
          icon={<FaceIcon />}
          label="My cabinet"
          clickable
          className={classes.chip}
          color="primary"
          onDelete={handleDelete}
          deleteIcon={<DoneIcon />}
        />
      </div>
      <Categories />
      <Search />
      <div className="container text-center">
      <BasketInfo />
      </div>
      <div className="container text-center">
        <div className='container my-4'>
          <Basket />
        </div>
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sidebar);