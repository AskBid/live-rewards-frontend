import styled from 'styled-components'
import {FaTimes} from 'react-icons/fa'

export const DeleteBtn = styled.button `
	background: rgba(245, 81, 66, 0.05);
	border: none;
	color: white;
	min-width: 28px;
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

export const AddrLabel = styled.span`
	color: rgba(40, 40, 40, 0.3);
	font-size: 0.7em;
	position: absolute;
	top: -13px;
	right: 0px;
	&:hover {
    color: rgba(245, 81, 66, 0.7);
    font-weight: bold;
    cursor: auto; 
  }
`

export const SpinnerDiv = styled.div`
	position: absolute;
	width: 100%;
	top: 10px;
	z-index: 5;
`