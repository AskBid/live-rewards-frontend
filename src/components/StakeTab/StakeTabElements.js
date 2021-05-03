import styled from 'styled-components'
import { FaTimes, FaSwimmingPool, FaChartPie } from 'react-icons/fa'

export const DeleteBtn = styled.button `
	/*background: rgba(255,127,80,0.5);*/
	background: rgba(0, 123, 255, 0.2);
	border: none;
	border-radius: 3px;
	color: transparent;
	padding: 1.5px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: red;
    color: red;
    border: none;
  }
  &:disabled {
  	background: rgba(200, 200, 200, 0.4);
  	border: none;
  	color: transparent;
  }
`;

export const FuncBtn = styled.button `
	/*background: #6c757d;*/
	background: rgba(0, 123, 255, 0.8);
	border: none;
	border-radius: 3px;
	color: white;
	padding: 2px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: rgba(0, 113, 235, 1);
    color: #e4e2ff;
    border: none;
  }
  &:disabled {
  	background: rgba(200, 200, 200, 0.4);
  	border: none;
  }
`;

export const CloseIcon = styled(FaTimes)`
	color: rgba(250, 250, 250, 0.9);
	margin: 0px;
	padding: 0px;
	&:hover {
    color: none;
  }
`

export const PoolIcon = styled(FaSwimmingPool)`
	color: rgba(255, 255, 255, 1);
	margin: 0px;
	padding: 0px;
`

export const DeleFlowIcon = styled(FaChartPie)`
	color: rgba(255, 255, 255, 1);
	margin: 0px;
	padding: 0px;
`

export const AddrLabel = styled.div`
	color: rgba(0, 123, 255, 0.45);
	font-size: 0.7em;
	position: absolute;
	top: -1.5em;
	right: 0px;
	&:hover {
    color: rgba(0, 123, 255, 0.8);
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