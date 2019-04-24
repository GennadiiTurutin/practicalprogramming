import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'

import Layout from './containers/layout'
import Product from './containers/product'
import Products from './containers/products'
import Basket from './containers/basket'
import Cabinet from './containers/cabinet'
import Profile from './containers/profile'

import reducers from './reducers'

import './App.css';

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(thunk)
 ))

class App extends Component {
 
  render() {
    return (
      <div>
        <Provider store={store}>
          <Router>
            <Layout>
              <Switch>
                <Route path='/' exact component={Products} />
                <Route path='/categories/:id' component={Products} />
                <Route path='/products/:id' component={Product} />
  		          <Route path='/basket' component={Basket} />
                <Route path='/profile' component={Profile} />
                <Route path='/cabinet' component={Cabinet} />
  		        </Switch>
  		      </Layout>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
