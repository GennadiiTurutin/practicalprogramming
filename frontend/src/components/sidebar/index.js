import React from 'react'
import Search from '../../components/search'
import Categories from '../../components/categories'

const Sidebar = (props) => {

  return (
    <div>
      <Categories />
      <Search />
    </div>
  )
}


export default Sidebar;