import React from 'react'
import { Nav, Bars, NavBtnLink, NavBtnUserLink, NavMenu, NavLink, NavLinkLogo, MobileIcon, NavbarContainer } from './NavbarElements'
import { useSelector } from 'react-redux'

const Navbar = ({toggle}) => {
    const user = useSelector( state => state.sessions.user )
    
    return (
      <Nav className='position-fixed fixed-top shadow-sm'>
        <NavbarContainer>
          <NavLinkLogo to='/' exact>
  	        <h1>SWAN<span className='logo'>Pool</span></h1>
          </NavLinkLogo>
          <MobileIcon onClick={toggle}>
            <Bars />
          </MobileIcon>
          <NavMenu>
            <NavLink to='/pools'>
              Pools Gauge
            </NavLink>
          	<NavLink to='/live-rewards'>
              Live Rewards
            </NavLink>
          	<NavLink to='/howto' >
              How To
            </NavLink>
            { user ?
              <NavBtnUserLink to={`/users/${user}`}>@{user}</NavBtnUserLink>
              :
              <NavBtnLink to='/login'>Log In</NavBtnLink> }
          </NavMenu>
        </NavbarContainer>
      </Nav>
    )
};

export { Navbar };
