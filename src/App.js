import './App.css';
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import Home from './pages'
import LiveRewards from './pages/live-rewards'
import PoolsGauge from './pages/pools-gauge'
import PoolCompare from './pages/pool-compare'
import Signup from './pages/signup'
import Login from './pages/login'
import User from './pages/user'
import Howto from './pages/howto'
import DelegationFlows from './pages/delegation-flows'
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
      <div className='h-100 d-flex flex-column align-items-center'>
        <Navbar toggle={toggle}/>
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <div className='bg-danger' style={{height:'80px'}}></div>
        <div className='w-100 h-100 d-flex align-items-start'>
          <Switch>
            <Route path='/live-rewards' component={LiveRewards}/>
            <Route path='/pools' component={PoolsGauge}/>
            <Route path='/delegation-flows/epochs/:epoch_no/pools/:ticker' component={DelegationFlows}/>
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
        </div>
      </div>
    </Router>
  );
};

export default App;
