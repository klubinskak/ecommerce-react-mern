import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { mobile } from '../responsive';


const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
  
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 330px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  position: relative;
  &:hover ${Info}{
    opacity: 1;
  }
  ${mobile({justifyContent: "center", alignItems: "center"  })}
`;

const Circle = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 70%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const ItemLink = styled(Link)`
color: black;
${mobile({marginLeft:"auto", marginRight:"auto" })}
`

const Product = ({ item }) => {
  return (
    <ItemLink to={`/products/${item._id}`}>
    <Container>
    <Circle />
    <Image src={item.image} />
    <Info>
      <Icon>
        <ShoppingCartOutlined />
      </Icon>
      <Icon>
        <SearchOutlined />
      </Icon>
      <Icon>
        <FavoriteBorderOutlined />
      </Icon>
    </Info>
  </Container>
   </ItemLink>
  );
};

export default Product;
