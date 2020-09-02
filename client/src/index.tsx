import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';

const App = (
  <Router>
      <Route exact path="/" component={Landing}/>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
  </Router>
);

ReactDOM.render(
  App,
  document.getElementById('root')
);
