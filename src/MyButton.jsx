import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';



const MyButton = styled(({  ...other }) => <Button {...other} />)`
  background: ${props => props.inputcolor};
  border: 0;
  color: white;
  height: 48px;
  
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);

  & .MuiButton-label {
    color: ${props => props.color};
  }
`;



function handleClick(url)
{
    if(url!=="none")
    {
    window.open(url, "_blank")
    }
}

export default function MyButtonMaker(props) {
    return (
                <MyButton color={props.color}  inputcolor={props.inputcolor} onClick={()=>{handleClick(props.url)}}>{props.label}</MyButton>
    );
}