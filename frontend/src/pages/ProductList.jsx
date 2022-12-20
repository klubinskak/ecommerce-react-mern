import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";

const Container = styled.div`
`;
const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 10px;
`;
const Select = styled.select`

padding: 10px;`;
const Option = styled.option``;

const ProductList = () => {
  const [query, setQuery] = useState();
  const colors = ["White", "Black", "Green", "Beige", "Brown"];



  useEffect(() => {
  }, [query]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>Dresses</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select onChange={(e) => setQuery(e.target.value)}>
            <Option disabled selected>
              Color
            </Option>
            {colors.map((color) => 
              <Option value={color}>{color}</Option>
            )}
          </Select>
          <Select>
            <Option disabled selected>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select>
            <Option selected>
              Newest
            </Option>
            <Option>Price(asc)</Option>
            <Option>Price(desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products query={query} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
