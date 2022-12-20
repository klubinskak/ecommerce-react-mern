import React from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
flex: 1;
margin: 3px;
height: 50vh;
position: relative;
`
const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`
const Info = styled.div`
position: absolute;
width: 100%;
height: 100%;
top: 0;
left: 0;
display: flex;
align-items: center;
justify-content: center;
`
const Title = styled.h1`
`
const Button = styled.button`
`

const CategoryItem = ({item}) => {
  const navigate = useNavigate();
  return (
    <Container>
        <Image src={item.img}/>
        <Info>
            <Title>{item.Title}</Title>
            <Button onClick={() => {navigate('/productslist')}}>SHOP NOW</Button>
        </Info>
    </Container>
  )
}

export default CategoryItem