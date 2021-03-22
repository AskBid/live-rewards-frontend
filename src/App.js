import './App.css';
import React from 'react';
import { Navbar } from './components/Navbar';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import Home from './pages'
import Liverewards from './pages/rewards'
import Signup from './pages/signup'
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/live-rewards' component={Liverewards}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/' exact component={Home}/>
      </Switch>
    </Router>
  );
};

export default App;
