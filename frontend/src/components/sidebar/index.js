import React from 'react'
import BasketInfo from '../../components/basketInfo'
import Search from '../../components/search'
import Categories from '../../components/categories'
import Basket from '../../containers/basket'

const Sidebar = () => {
  return (
    <div>
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

export default Sidebar