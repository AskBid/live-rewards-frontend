import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'

export const Nav = styled.nav `
  background: linear-gradient(88deg, rgb(73,62,169) 0%, rgba(48,42,168,100%));
  height: 80px;
  margin-top: 0px;
  display: flex;
  color: #fff;
  justify-content: space-between;
  align-content: center;
  padding-bottom: 0;
  padding: 0em calc((100vw - 1100px) / 2);
  top:0;
  z-index: 10;
  position: relative;

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1100px;
`

export const MobileIcon = styled.div`
  display: none;
  
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #fff;
  }
`

export const Bars = styled(FaBars)
`
  display: none;
  color: #fff;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavLink = styled(Link)
`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  margin: 0;
  height: 100%;
  cursor: pointer;
  padding-bottom: 3px;
  &.active {
    text-decoration: none;
    border-bottom: 3px solid #fff;
    padding-bottom: 0;
    // border-bottom: 3px solid #4ad9e4;
  }
`;

export const Logo = styled.nav `
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  white-space: nowrap;
`

export const NavMenu = styled.div `
  display: flex;
  align-items: center;
  margin-right: 24px;
  white-space: nowrap;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)
`
  border-radius: 30px;
  background: #4ad9e4;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 5em;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;