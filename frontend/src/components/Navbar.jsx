import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import React, {useContext, useState} from 'react'
import styled  from 'styled-components';
import { Badge } from '@material-ui/core';
import { mobile } from "../responsive";
import { UserContext } from '../context/UserContext';
import { BagIndexContext } from '../context/BagIndex';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import  axios  from 'axios';
import { useEffect } from 'react';


const Container = styled.div`
    height: 60px;
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const Center = styled.div`
    flex: 1;
    text-align: center;
`

const Logo = styled.h1`

`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const Language = styled.span`
    font-size: 14;
    ${mobile({ display: "none" })}

`

const SearchContainer = styled.div`
    border: 1px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    ${mobile({ display: "none" })}

`

const Input = styled.input`
    border: none;
`

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
`
 

const Navbar = () => {
    const {user, setUser} = useContext(UserContext);
    const {bagIndex, setBagIndex} = useContext(BagIndexContext)
    const [query, setQuery] = useState();
    const navigate = useNavigate();
    const [bag, setBag] = useState([]);


    useEffect(() => {
       getBag();
       setBagIndex(bag.length);
      }, [bagIndex]);
        
    const handleSearch = () => {
    navigate(`/search/${query}`, {state: {query}})
    }

const getBag = async () => {
    await axios
    .get('http://localhost:3500/api/shoppingbag')
    .then((res) => {
      setBag(res.data);
      setBagIndex(res.data.length)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <Container>
        <Wrapper>
            <Left>
                <Language>EN</Language>
                <SearchContainer>
                    <Input placeholder='Search' onChange={(e) => {setQuery(e.target.value)}}/>
                    <Search style={{color: 'gray', fontSize: 16}} onClick={handleSearch}/>
                </SearchContainer>
            </Left>
            <Link to="/" style={{textDecoration:"none", color: 'inherit'}} ><Center><Logo>KLUBINI.</Logo></Center></Link>
            <Right>
            {!user && <Link style={{textDecoration:"none", color: 'inherit'}} to="/register"><MenuItem>REGISTER</MenuItem></Link>}
            {!user && <Link style={{textDecoration:"none", color: 'inherit'}} to="/login"><MenuItem>LOG IN</MenuItem></Link>}
             {user && <MenuItem>SIGN OUT </MenuItem>}
                <Link to="/card" style={{textDecoration:"none", color: 'inherit'}}>
                <MenuItem>
                    <Badge badgeContent={bagIndex} color="primary">
                        <ShoppingCartOutlined/>
                    </Badge>
                </MenuItem>
                </Link>
                </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar