import React, {useState, useEffect, useContext} from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { Button } from "../const/Button";
import { Add, House } from "@material-ui/icons";
import { Remove } from "@material-ui/icons";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { mobile } from '../responsive';
import  axios  from 'axios';
import { AiOutlineClose } from "react-icons/ai";
import { BagIndexContext } from '../context/BagIndex';

const Container = styled.div`
${mobile({ width:"100vh" })}`;
const Wrapper = styled.div`
`;
const Title = styled.h1`
align-items: center;
margin: 40px 0 0 50px;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const Bottom = styled.div`
  display: flex;
  justify-items: space-between;
  padding: 20px;
  ${mobile({ flexDirection: "column", justifyContent: "center", alignItems: "center" })}

`;
const TopTexts = styled.div`
${mobile({ display: "flex",  alignItems:"center", textAlign: "center" })}
`;
const TopText = styled.span`
  cursor: pointer;
  margin: 0px 10px;
  ${mobile({ fontSize:"12px" })}
`
const Info = styled.div`
  flex: 3;
  margin-right: 30px;
  
`;
const ProductDetail = styled.span`
  display: flex;
  flex: 2;
`;
const Summary = styled.div`
  flex: 1;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: 0.5px solid lightgray;
  ${mobile({ width: "60vw", marginTop: '20px' })}

`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ fontSize: "12px", alignItems:"center", justifyContent:"center" })}
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  margin-left: 300px;
  ${mobile({ marginLeft:"100px" })}
  display: flex;
  float: right;
  align-items: right;
  justify-content: center;
  flex-direction: column;
`;

const Image = styled.img`
  width: 300px;
  ${mobile({ width: "100px" })}
`;

const Details = styled.div`
  height: 40%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  padding: 20px;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ fontSize:"15px" })}

`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ fontSize:"18px" })}

`;

const Delivery = styled.div`
`
const HouseDelivery = styled.div`
display: flex;
align-items:center;
gap:5px;
`

const BoxDelivery = styled.div`
display: flex;
align-items:center;
gap: 5px;
`

const Promocode = styled.div`
text-align:center;
`
const InputCode = styled.input`
padding: 10px;
margin-bottom:5px;
border-radius: 10px;
border: 0.5px solid lightgray;
`
const SubtotalContainer = styled.div`
display: flex;
justify-content: space-between;

`
const SubtotalHeader = styled.div`
color: gray;

`
const ShippingContainer= styled.div`
display: flex;
justify-content: space-between;

`
const ShippingHeader = styled.div`
color: gray;

`
const TotalContainer = styled.div`
display: flex;
justify-content: space-between;
`
const Center = styled.div`
align-items:center;
text-align:center;
`

const TitleDelivery = styled.h1`
text-align: center;
align-items: center;
`

const ProductContainer = styled.div`
`

const ShoppingCard = () => {
  const [bag, setBag] = useState([]);
  const [number, setNumber] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const {bagIndex, setBagIndex} = useContext(BagIndexContext)


 
  useEffect(() => {
    getBag();
  }, [])

  const getBag = async () => {
    await axios
    .get('http://localhost:3500/api/shoppingbag')
    .then((res) => {
      setBag(res.data);
      setBagIndex(res.data.length);
      setSubTotal(res.data.reduce((total, item) => total + (item.price), 0))
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const handleDelete = async (_id) => {
    await axios
    .delete('http://localhost:3500/api/shoppingbag/delete', _id)
    .then((res) => {
      getBag();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setPromoCode(event.target.value);
      if(event.target.value === "promo20"){
        const promoPrice = (subTotal * 0.75)
        setSubTotal(promoPrice);
      }
    }
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Top>
          <Button>BACK</Button>
          <TopTexts>
            <TopText>Shopping Bag({bagIndex})</TopText>
            <TopText>Whishlist(0)</TopText>
          </TopTexts>
          <Button type="filled">CHECKOUT</Button>
        </Top>
        <Title>CART</Title>
        <Bottom>
          <Info>
            {bag.map((item) => {
              return (
                <ProductContainer>
                <Product>
                  <ProductDetail>
                    <Image src={item.image} />
                    <Details>
                      <ProductName>
                        <b>PRODUCT:</b> {item.name}{" "}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {item._id}{" "}
                      </ProductId>
                      <ProductColor color={item.color} />
                      <ProductSize>
                        <b>SIZE:</b> {item.size}
                      </ProductSize>
                    </Details>
                    <PriceDetail>
                      <ProductAmountContainer> 
                        <Add/>
                        <ProductAmount>{item.pieces}</ProductAmount>
                        <ProductAmount>{number}</ProductAmount>
                        <Remove />
                      </ProductAmountContainer>
                      <ProductPrice>${item.pieces * item.price}</ProductPrice>
                    </PriceDetail>
                    <AiOutlineClose onClick={() => handleDelete(item._id)} size={"25px"} style={{marginTop: "10px"}}/>
                  </ProductDetail>
                </Product>
                <hr/>
                </ProductContainer>
              );
            })}
          </Info>
          <Summary>
            <TitleDelivery>ORDER SUMMARY</TitleDelivery>
            <Delivery>
                <HouseDelivery><House/>
                <p>House Delivery</p></HouseDelivery>
                <BoxDelivery>
                <LocalShippingIcon/> 
                <p>Box Delivery </p>
                </BoxDelivery>
            </Delivery>
            <Promocode>
              <p style={{margin: "5px"}}> Use code, promo20 for 20% discount </p>
                <InputCode placeholder="Promocode" onKeyDown={(e) => {handleEnter(e)}}></InputCode>
                {promoCode === "promo20"  ? ( <p>20% off discount</p> ) : promoCode && (<p>Incorrect code</p>)}
            </Promocode>
            <SubtotalContainer>
                <SubtotalHeader>Subtotal</SubtotalHeader>
                <p>${subTotal}</p>
            </SubtotalContainer>
            <ShippingContainer>
                <ShippingHeader>Shipping</ShippingHeader>
                <p>$8</p>
            </ShippingContainer>
            <hr/>
            <TotalContainer>
                <b>Total</b>
                <p>${subTotal + 8}</p>
            </TotalContainer>
            <Center>
            <Button>Place order</Button>
            </Center>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};      

export default ShoppingCard;
