import React from 'react'

import Navigation from '../../components/navbar';


const Layout = ({children}) => (
	<div className="container">
		<Navigation />
		{children}
	</div>
)

export default Layout