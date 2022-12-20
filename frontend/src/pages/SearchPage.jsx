import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import { useParams } from 'react-router-dom';

const Container = styled.div``;
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

const SearchPage = () => {
    const { query } = useParams();

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>Dresses</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select>
            <Option disabled selected>
              Color
            </Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Green</Option>
            <Option>Beige</Option>
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
      <Products query = {query} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default SearchPage;
