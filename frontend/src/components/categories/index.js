import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {getCategories, getActiveCategoryId} from '../../selectors'
import {compose} from 'redux'
import classNames from 'classnames'
import * as R from 'ramda';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

const Categories = ({categories, activeCategoryId}) => {
  
  const renderCategory = (category, index) => {
  	const getActiveState = R.propEq('id', activeCategoryId)
    const SelectCategory = props => <Link to={`/categories/${category.id}`} {...props} />
  	const linkClass = classNames({
      'bg-secondary': true,
      'rounded-0': true,
  		'active': getActiveState(category)
    })

  	return (
      <Button aria-label="Category" color="primary" component={SelectCategory} key={index}>
        <div className="container text-left text-grey">
        <h5>
          <Checkbox
            checked={false}
            value="checkedA"
          />
          {category.title}
        </h5>
        </div>
      </Button>
	  )
  }

  const renderAllCategory = () => {
    const AllCategories = props => <Link to="/" {...props} />
  	const linkClass = classNames({
  		'list-group-item': true,
      'bg-secondary': true,
      'rounded-0': true,
  		'active': R.isNil(activeCategoryId)
  	})

  	return (
      <Button aria-label="Category" color="primary" component={AllCategories}>
        <div className="container text-left text-grey">
        <h5>
          <Checkbox
            checked={false}
            value="checkedA"
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