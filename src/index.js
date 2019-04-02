import './main.css'
import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {browserHistory, Router, Route} from 'react-router' 
import {syncHistoryWithStore} from 'react-router-redux'
import {Provider} from 'react-redux'

import Layout from 'containers/layout'
import Products from 'containers/products'

import reducers from 'reducers'

const store = createStore(reducers, composeWithDevTools(
	applyMiddleware(thunk)
))

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
	<Provider store={store}>
	  <Router history={history}>
		 <Route component={Layout} />
		   <Route path='/' component={Products} />
	  </Router>
	</Provider>,
	document.getElementById('root')
)

document.write('Hello React/Redux!')