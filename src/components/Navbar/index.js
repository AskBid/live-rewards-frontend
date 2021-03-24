import React from 'react'
import { Nav, Bars, NavBtnLink, NavMenu, NavLink, MobileIcon, NavbarContainer } from './NavbarElements'

const Navbar = ({toggle}) => {
    return (
      <Nav>
        <NavbarContainer>
          <NavLink to='/' exact>
  	        <h1>SWAN<span>Pool</span></h1>
          </NavLink>
          <MobileIcon onClick={toggle}>
            <Bars />
          </MobileIcon>
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
        </NavbarContainer>
      </Nav>
    )
};

export { Navbar };
