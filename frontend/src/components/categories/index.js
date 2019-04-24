import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {getCategories, getActiveCategoryId} from '../../selectors'
import {compose} from 'redux'
import classNames from 'classnames'
import * as R from 'ramda';

const Categories = ({categories, activeCategoryId}) => {
  const renderCategory = (category, index) => {
  	const getActiveState = R.propEq('id', activeCategoryId)
  	const linkClass = classNames({
  		'list-group-item': true,
      'bg-secondary': true,
      'rounded-0': true,
  		'active': getActiveState(category)
    })

  	return (
      <div key={index}>
  		<Link 
  		  to={`/categories/${category.id}`}
  		  className={linkClass}
        style={{ textDecoration: 'none' }}
  		  key={index}>
        <h4 className="text-grey">{category.name}</h4>
  		</Link>

      </div>
	  )
  }

  const renderAllCategory = () => {
  	const linkClass = classNames({
  		'list-group-item': true,
      'bg-secondary': true,
      'rounded-0': true,
  		'active': R.isNil(activeCategoryId)
  	})

  	return (
  		<Link to='/' className={linkClass} style={{ textDecoration: 'none' }}>
      <h4 className="text-grey">All categories</h4>
      </Link>
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