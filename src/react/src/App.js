import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { toast } from "react-toastify";

import Layout from './containers/layout'
import Product from './containers/product'
import Products from './containers/products'
import Classroom from './containers/classroom'
import Material from './containers/material'
import reducers from './reducers'

import './App.css';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)
const store = createStore(persistedReducer, composeWithDevTools(
  applyMiddleware(thunk)))
const persistor = persistStore(store)
persistor.purge()
//const store = createStore(reducers, composeWithDevTools(
  //applyMiddleware(thunk)
 //))



class App extends Component {
 
  render() {
    return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router>
                  <Layout>
                    <Switch>
                      <Route exact path='/' component={Products} />
                      <Route exact path='/categories/:id' component={Products} />
                      <Route exact path='/products/:slug' component={Product} />
                      <Route exact path='/classroom' component={Classroom} />
                      <Route exact path='/material/:slug' component={Material} />
                      <Route path="*" render={() => {toast.info("Path doesn't exist!"); return( <Redirect to='/' /> )} } /> 
        		        </Switch>
  		            </Layout>
            </Router>
          </PersistGate>
        </Provider>
    )
  }
}

export default App;
