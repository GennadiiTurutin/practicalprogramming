import React from 'react'
import BasketInfo from '../../components/basketInfo'
import BasketCart from '../../components/basketCart'
import Search from '../../components/search'
import Categories from '../../components/categories'

const Sidebar = () => {
  return (
    <div>
      <Categories />
      <Search />
      <div className="container text-center">
      <BasketInfo />
      </div>
      <div className="container text-center">
      <BasketCart />
      </div>
    </div>
  )
}

export default Sidebar