import React from 'react'
import {SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink, SidebarRoute, SideBtnWrap} from './SidebarElements.js'

const Sidebar = ({isOpen,toggle}) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
      	<CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to='/live-rewards' onClick={toggle}>Live Rewards</SidebarLink>
          <SidebarLink to='/poolrace' onClick={toggle}>Pool Race</SidebarLink>
          <SidebarLink to='/howto' onClick={toggle}>How to</SidebarLink>
          <SidebarLink to='/about' onClick={toggle}>About</SidebarLink>
          <SidebarLink to='/signup' onClick={toggle}>Sign up</SidebarLink>
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarRoute to='/signin'>Sign in</SidebarRoute>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  )
}

export default Sidebar
