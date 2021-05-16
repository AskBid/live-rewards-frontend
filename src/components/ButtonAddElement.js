import styled from 'styled-components'

export const ButtonAdd = styled.button `
    /*background: rgba(255,127,80,0.5);*/
    /*border: 1px solid #4ad9e4;*/
    background: rgba(0, 123, 255, 1);
    border: 1px solid rgba(0, 123, 255, 1);
    color: #fff;
    padding: 0px 1.2em 0px 1.2em;
    height: 30px;
    &:hover {
      transition: all 0.05s ease-in-out;
      background: #4ad9e4;
      color: white;
      border: 1px solid transparent;
    }
  `;

export const ButtonNav = styled.button `
  /*background: rgba(255,127,80,0.5);*/
  /*border: 1px solid #4ad9e4;*/
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(0, 123, 255, 1);
  color: #333;
  padding: 0px 2em 0px 2em;
  height: 30px;
  &:hover {
    transition: all 0.05s ease-in-out;
    background: #4ad9e4;
    color: white;
    border: 1px solid transparent;
  }
`;