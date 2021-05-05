import styled from 'styled-components'
import { FaTimes, FaSwimmingPool, FaChartPie } from 'react-icons/fa'

export const DeleteBtn = styled.button `
	/*background: rgba(255,127,80,0.5);*/
	background: transparent;
	border: 1px solid rgba(0, 123, 255, 0.4);
	border-radius: 3px;
	color: transparent;
	padding: 0.5px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: rgba(245,120,90,0.8);
    color: rgba(245,120,90,0.8);
    border: 1px solid rgba(245,120,90,0.8);
  }
  &:disabled {
  	background: rgba(200, 200, 200, 0.4);
  	border: 1px solid #eee;
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
	color: rgba(0, 123, 255, 0.3);
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
	&:disabled {
  	background: rgba(200, 200, 200, 0.4);
  	border: none;
  }
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