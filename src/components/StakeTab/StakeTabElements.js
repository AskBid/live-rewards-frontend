import styled from 'styled-components'
import { FaTimes, FaSwimmingPool, FaChartPie } from 'react-icons/fa'

export const DeleteBtn = styled.button `
	/*background: rgba(255,127,80,0.5);*/
	background: rgba(74, 217, 228, 0.5);;
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
`;

export const PoolBtn = styled.button `
	/*background: #6c757d;*/
	background: rgba(74, 217, 228, 0.5);
	border: none;
	border-radius: 3px;
	color: white;
	min-height: 30px;
	padding: 2px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: rgba(74, 217, 228, 1);
    color: #e4e2ff;
    border: none;
  }
`;

export const DeleFlowBtn = styled.button `
	background: rgba(255,195,20,0.4);
	border: none;
	border-radius: 0px 0px 0px 0px;
	color: white;
	min-width: 30px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: rgba(255,127,80,0.9);
    color: #e4e2ff;
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