import { Facebook, Instagram, Twitter, Pinterest } from '@material-ui/icons';
import React from 'react'
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
`

const Logo = styled.div`
padding: 10px;`
const SocialContainer = styled.div`
display: flex;
`
const SocialIcon = styled.div`
weight: 40px;
height: 40px;
border-radius: 50%;
align-items: center;
margin-right: 5px;
`

const Copyrights = styled.h5`
font-weight: 500;
${mobile({ fontSize: "10px" })}

`

const Footer = () => {
  return (
    <Container>
            <Logo>KLUBINI.</Logo>
            <SocialContainer>
                <SocialIcon>
                    <Facebook/>
               </SocialIcon>
               <SocialIcon>
                    <Instagram/>
               </SocialIcon>
               <SocialIcon>
                    <Twitter/>
               </SocialIcon>
               <SocialIcon>
                    <Pinterest/>
               </SocialIcon>
            </SocialContainer>
            <Copyrights>Made with ♥️</Copyrights>
    </Container>
  )
}

export default Footer