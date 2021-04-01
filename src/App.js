import './App.css';
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import Sidebar from './components/Sidebar';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import Home from './pages'
import Liverewards from './pages/rewards'
import Signup from './pages/signup'
import Login from './pages/login'
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
        <Route path='/users/:username/stake_addresses' component={Liverewards}/>
        <Route path='/login' component={Login}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/' exact component={Home}/>
      </Switch>
    </Router>
  );
};

export default App;
