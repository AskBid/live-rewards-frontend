import React from 'react'
import { NavLink } from 'react-bootstrap'
import { Nav, Bars, NavBtn, NavBtnLink } from './NavbarElements'

const Navbar = () => {
    return (
      <Nav>
        <NavLink to='/'>
          <h1>Logo</h1>
        </NavLink>
        <Bars />
        <NavBtn>
        	<NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    )
};

export { Navbar };
