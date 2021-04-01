import React from 'react'
import { Nav, Bars, NavBtnLink, NavMenu, NavLink, NavLinkLogo, MobileIcon, NavbarContainer } from './NavbarElements'

const Navbar = ({toggle}) => {
    return (
      <Nav>
        <NavbarContainer>
          <NavLinkLogo to='/' exact>
  	        <h1>SWAN<span className='logo'>Pool</span></h1>
          </NavLinkLogo>
          <MobileIcon onClick={toggle}>
            <Bars />
          </MobileIcon>
          <NavMenu>
          	<NavLink to='/live-rewards'>
              Live Rewards
            </NavLink>
          	<NavLink to='/howto' >
              How To
            </NavLink>
            <NavLink to='/about' >
              About
            </NavLink>
            <NavBtnLink to='/signin'>Sign In</NavBtnLink>
          </NavMenu>
        </NavbarContainer>
      </Nav>
    )
};

export { Navbar };
