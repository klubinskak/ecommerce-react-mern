import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Add, Remove } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BagIndexContext } from "../context/BagIndex";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;
const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 2;
`;
const Image = styled.img`
  width: 50%;
  max-height: 100vh;
`;
const Title = styled.h1`
  font-weight: 200;
  text-transform: uppercase;
`;
const Desc = styled.p`
  margin: 15px 0px;
  font-weight: 100;
  font-size: 0.9rem;
  max-width: 300px;
`;
const Price = styled.span``;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  width: 150px;
  margin-top: 10px;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid black;
  border-radius: 50%;
  margin: 0px 5px;
  background-color: ${(props) => props.color};
  z-index: -1;
`;


const FilterSize = styled.select`
  margin-left: 10px;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterSizeOption = styled.option``;
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-ccontent: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const Button = styled.button`
  padding: 10px;
  border: 1px solid lightgray;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  margin-left: 10px;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const { productId } = useParams();
  const [number, setNumber] = useState(1);
  const [product, setProduct] = useState([]);
  const [size, setSize] = useState();
  const [color, setColor] = useState();
  const { bagIndex, setBagIndex } = useContext(BagIndexContext);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    await axios
      .get(`http://localhost:3500/api/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        console.log(res.data);
        setSize(res.data.size[0]);
        setColor(res.data.color[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToCart = async (product) => {
    const cardProduct = {
      _id: product._id,
      name: product.name,
      price: product.price,
      colors: color,
      size: size,
      image: product.image,
      pieces: number,
    };

    await axios
      .post("http://localhost:3500/api/shoppingbag/add", cardProduct)
      .then((response) => {
        console.log(response);
        setBagIndex(bagIndex + 1);
      })
      .catch((err) => {
        console.log(err);
        console.log(cardProduct);
      });
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.image} alt="" />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.name}</Title>
          <Desc>{product.description}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
                <FilterTitle>Color</FilterTitle>
                {product.colors?.map((item) => (
                  <FilterColor value={item} color={item}/>
                ))}
            </Filter>
            <Filter color={size}>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => {
                      setSize(e.target.value);
                    }}>
                {product.size?.map((size) => (
                  <FilterSizeOption
                    value={size}
                  >
                    {size}
                  </FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => number > 1 && setNumber(number - 1)} />
              <Amount>{number}</Amount>
              <Add onClick={() => number < 10 && setNumber(number + 1)} />
            </AmountContainer>
            <Button
              onClick={() => {
                addToCart(product);
              }}
            >
              ADD TO CART
            </Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
