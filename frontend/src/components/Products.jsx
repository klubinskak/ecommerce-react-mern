import React, {useContext, useEffect, useState} from 'react'
import  styled  from 'styled-components';
import Product from './Product';
import axios from 'axios';
import { ProductContext } from '../context/ProductContext';

const Container = styled.div`
display: flex;
padding: 20px;
flex-wrap: wrap;
justify-content: space-between;
`

const Products = ({query}) => {
  const {products, setProducts} = useContext(ProductContext);
  const [filteredSearch, setFilteredSearch] = useState([]);

  
  useEffect(() => {
    getProducts();
  }, [filteredSearch]);

  const getProducts = async () => {
    await axios
    .get("http://localhost:3500/api/products")
    .then(res => {
      setProducts(res.data);
      console.log(res.data);
      const filteredSearch = products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
      setFilteredSearch(filteredSearch);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <Container>
      { filteredSearch.length > 0 ? filteredSearch.map((items) => (
        <Product item={items} key={items.id}/>
    )) : products?.filter((item, index) => index < 9).map((item) => (
      <Product item={item} key={item.id}/>
  ))}
  </Container>
  )
}

export default Products