import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {getCategories, getActiveCategoryId} from '../../selectors'
import {compose} from 'redux'
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import * as R from 'ramda';
import red from '@material-ui/core/colors/red';

const Categories = ({categories, activeCategoryId}) => {
  
  const renderCategory = (category, index) => {
    const categoryActive = R.equals(category.id, Number(activeCategoryId));
    const link = (categoryActive === true) ? `/` : `/categories/${category.id}`;
    const SelectCategory = props => <Link to={link} {...props} /> 

  	return (
      <Button aria-label="Category" color="primary" component={SelectCategory} key={index}>
        <div className="container text-left text-grey">
          <h5>
            <Checkbox checked={categoryActive} 
                style={{ color: red[500],'&$checked': { color: red[500],},}} 
            />
            {category.title}
          </h5>
        </div>
      </Button>
	  )
  }

  const renderAllCategory = () => {
    const AllCategories = props => <Link to="/" {...props} />
  	return (
      <Button aria-label="Category" color="primary" component={AllCategories}>
        <div className="container text-left text-grey">
          <h5>
            <Checkbox checked={ activeCategoryId===undefined } 
            style={{ color: red[500],'&$checked': { color: red[500],},}}
            />
            All categories
          </h5>
        </div>
      </Button>
  	)
  }

  return (
  	<div className='text-left'>
  	  <div className='list-group my-4'>
  	    {renderAllCategory()}
  	    {categories.map((category, index) => renderCategory(category, index))}
  	  </div>
  	</div>
  )
}

const mapStateToProps = (state, ownProps) => ({
	categories: getCategories(state),
	activeCategoryId: getActiveCategoryId(ownProps)
})


export default compose(withRouter, connect(mapStateToProps, null))(Categories)