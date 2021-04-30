import React from 'react'
import {
	SidebarContainer, 
	Icon, 
	CloseIcon, 
	SidebarWrapper, 
	SidebarMenu, 
	SidebarLink, 
	SidebarRoute, 
	SideBtnWrap
} from './SidebarElements.js'
import { useSelector } from 'react-redux'

const Sidebar = ({isOpen,toggle}) => {
  const user = useSelector( state => state.sessions.user )

  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
      	<CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to='/live-rewards' onClick={toggle}>Live Rewards</SidebarLink>
          <SidebarLink to='/pools' onClick={toggle}>Pools Gauge</SidebarLink>
          <SidebarLink to='/howto' onClick={toggle}>How to</SidebarLink>
          <SidebarLink to='/signup' onClick={toggle}>Sign up</SidebarLink>
        </SidebarMenu>
        <SideBtnWrap>
          { user ?
              <SidebarRoute to={`/users/${user}`}>@{user}</SidebarRoute>
              :
              <SidebarRoute to='/login'>Sign in</SidebarRoute> }
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  )
}

export default Sidebar
