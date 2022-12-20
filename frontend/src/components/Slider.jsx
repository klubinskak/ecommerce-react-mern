import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";
import { mobile } from '../responsive';
import {Link} from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  overflow: hidden;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.6;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
    width: 100vw;
    height:100%
    display: flex;
    align-items: center;
    position: relative;
`;

const ImgContainer = styled.div`
  height: 100%;
`;

const InfoContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const Description = styled.h2`
  width: 50%;
  position: absolute;
  top: 88%;
  color: #ced4da;
  text-align: center;
  left: 25%;
  margin-top: 5px;
  font-size: 20px;
  letter-spacing: 3px;
  font-weight: 500;
  ${mobile({ display: "none" })}
  `;

const Button = styled.button`
  position: absolute;
  width: 90px;
  top: 96%;
  left: 46%;
  ${mobile({ display: "none" })}
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  console.log(sliderItems);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Description>
                {item.desc}{" "}
                <span style={{ color: "black" }}>{item.descTwo}</span>
              </Description>
              <Link to="/productslist"> <Button>SHOP NOW</Button> </Link>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        {" "}
        <ArrowRightOutlined />{" "}
      </Arrow>
    </Container>
  );
};

export default Slider;
