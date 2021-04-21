import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom'

export const LinkText = styled(Link) `
  font-size: 1.1em;
  &:link {
    color: #18c7c4;
    text-decoration: none;
  }

  &:visited {
    color: #18c7c4;
    text-decoration: none;
  }

  &:active {
    color: #18c7c4;
    text-decoration: none;
  }

  &:hover {
    color: #18c7c4;
    text-decoration: none;
  }
`;