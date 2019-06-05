import React from 'react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

import Navigation from '../../components/navbar';


const Layout = ({children}) => (
	<div className="container">
	    <ToastContainer autoClose={2000} />
		<Navigation />
		{children}
	</div>
)

export default Layout