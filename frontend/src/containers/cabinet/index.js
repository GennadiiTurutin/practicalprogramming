import React, {Component} from 'react'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'primary',
  },
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

class Cabinet extends Component {

  render() {
  	const { classes } = this.props;
    return (
       <div className='col-sm-12 col-lg-12 col-md-12 my-5'>
         <div className="row">
           <div className="col-lg-4">
             <h1>Your purchase</h1>
             <div className={classes.root}>
                   <List component="nav">
                     <ListItem button>
                       <ListItemText primary="Purchase 1" />
                     </ListItem>
                     <ListItem button>
                       <ListItemText primary="Purchase 2" />
                     </ListItem>
                   </List>
                   <List component="nav">
                     <ListItem button>
                       <ListItemText primary="Purchase 3" />
                     </ListItem>
                     <ListItemLink href="#simple-list">
                       <ListItemText primary="Purchase 4" />
                     </ListItemLink>
                   </List>
                 </div>
           </div>
           <div className="col-lg-8">

           </div>
         </div>
       </div>

    )
  }
}

Cabinet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Cabinet);