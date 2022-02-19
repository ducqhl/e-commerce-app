import React from "react";
import styled from "styled-components";
import Annoucement from "../components/Annoucement";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Newsletters from "../components/Newsletters";
import Products from "../components/Products";

const Container = styled.div``;

const Title = styled.h1`
  margin: 1.5rem;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

const Filter = styled.div`
  display: flex;
  margin: 1.5rem;
  align-items: center;
`;

const FilterText = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  margin-right: 0.5rem;
`;

const Select = styled.select`
  padding: 0.8rem;
  margin-right: 1rem;
`;

const Option = styled.option``;

const ProductList = () => {
  return (
    <Container>
      <Annoucement />
      <NavBar />
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
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          <Select>
            <Option disabled selected>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select>
            <Option>Newest</Option>
            <Option>Price (ascending)</Option>
            <Option>Price (descending)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products />
      <Newsletters />
      <Footer />
    </Container>
  );
};

export default ProductList;
