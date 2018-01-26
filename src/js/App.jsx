import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {
  Router,
  Route,
  IndexRoute,
  hashHistory,
} from 'react-router';
require("../font/iconfont.css");
import { Provider } from 'react-redux';
import Index from './containers/Index.jsx';
import Collect from './containers/Collect.jsx';
import FileSearch from './containers/FileSearch.jsx'
import store from "./redux/store/store.js"


const routes = (
  <Provider store={store} >
    <Router history={hashHistory}>
      <Route path="/" component={Index}>
        <Route path="/collect" component={Collect} name="我的收藏" >
        </Route>
        <Route path="filesearch" component={FileSearch} ></Route>
      </Route>
    </Router>
  </Provider>
  )

ReactDom.render(
  routes,
  document.getElementById('root')
)