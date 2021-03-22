import React from 'react'
import { Nav, Bars, NavBtnLink, NavMenu, NavLink } from './NavbarElements'

const Navbar = () => {
    return (
      <Nav>
        <NavLink to='/'>
	        <h1>SWAN<span>Pool</span></h1>
        </NavLink>
        <Bars />
        <NavMenu>
        	<NavLink to='/live-rewards'>
            Live Rewards
          </NavLink>
          <NavLink to='/poolrace' >
            Pool Race
          </NavLink>
        	<NavLink to='/howto' >
            How To
          </NavLink>
          <NavLink to='/about' >
            About
          </NavLink>
          <NavLink to='/signup' >
            Sign Up
          </NavLink>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavMenu>
      </Nav>
    )
};

export { Navbar };
