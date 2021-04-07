import styled from 'styled-components'
import {FaTimes} from 'react-icons/fa'

export const DeleteBtn = styled.button `
	background: rgba(245, 81, 66, 0.05);
	border: none;
	color: white;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: rgba(245, 81, 66, 0.8);
    color: #e4e2ff;
    border: none;
  }
`;

export const CloseIcon = styled(FaTimes)`
	color: rgba(255, 250, 250, 0.8);
	margin: 0px;
	padding: 0px;
`