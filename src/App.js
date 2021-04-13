import './App.css';
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import Sidebar from './components/Sidebar';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import Home from './pages'
import LiveRewards from './pages/live-rewards'
import PoolCompare from './pages/pool-compare'
import Signup from './pages/signup'
import Login from './pages/login'
import User from './pages/user'
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [isOpen, setIsOpen] = useState(false)

  const toggle = () =>{
    setIsOpen(!isOpen);
  }

  return (
    <Router>
      <Navbar toggle={toggle} />
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Switch>
        <Route path='/live-rewards' component={LiveRewards}/>
        <Route path='/pool-compare/users/:username/epoch_stakes/:epoch_stakes_id' component={PoolCompare}/>
        <Route path='/login' component={Login}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/users/:username' component={User}/>
        <Route path='/' exact component={Home}/>
      </Switch>
    </Router>
  );
};

export default App;
