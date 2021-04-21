import './App.css';
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import Home from './pages'
import LiveRewards from './pages/live-rewards'
import PoolCompare from './pages/pool-compare'
import Signup from './pages/signup'
import Login from './pages/login'
import User from './pages/user'
import Howto from './pages/howto'
import { useSelector } from 'react-redux'
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const user = useSelector(state => state.sessions.user)

  const [isOpen, setIsOpen] = useState(false)

  const toggle = () =>{
    setIsOpen(!isOpen);
  }

  return (
    <Router>
      <Navbar toggle={toggle}/>
      <div style={{height:'80px'}}></div>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Switch>
        <Route path='/live-rewards' component={LiveRewards}/>
        <Route path='/pool-compare/users/:username/epoch_stakes/:epoch_stake_id' component={PoolCompare}/>
        <Route path='/login' component={Login}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/howto' component={Howto}/>
        <Route path='/users/:username' component={User}/>
        <Route exact path="/">
          {user ? <Redirect to="/live-rewards" /> : <Home />}
        </Route>
        <Route path='/intro' component={Home}/>
      </Switch>
    </Router>
  );
};

export default App;
