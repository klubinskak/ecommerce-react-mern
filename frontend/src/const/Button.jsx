import styled from 'styled-components';

export const Button = styled.button`
background-color: black;
  border: 1px solid #d5d9d9;
  border-radius: 8px;
  box-shadow: rgba(213, 217, 217, .5) 0 2px 5px 0;
  box-sizing: border-box;
  color: #ffff;
  cursor: pointer;
  display: inline-block;
  font-size: 13px;
  line-height: 29px;
  padding: 6 10px 0 11px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  width: 130px;
  :hover{
    background-color: #212529;
  }
  &:focus{
    border-color: #008296;
    box-shadow: rgba(213, 217, 217, .5) 0 2px 5px 0;
    outline: 0;
  }
`
