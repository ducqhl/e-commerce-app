import React from "react";
import styled from "styled-components";
import Annoucement from "../components/Annoucement";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Newsletters from "../components/Newsletters";
import Products from "../components/Products";
import { mobile } from "../responsive";

const Container = styled.div``;

const Title = styled.h1`
  margin: 1.25rem;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 1.25rem;

  ${mobile({
    margin: "0.8rem 0.5rem",
    display: "flex",
    flexDirection: "column",
  })};
`;

const FilterText = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  margin-right: 1.25rem;

  ${mobile({
    marginRight: "0rem",
  })}
`;

const Select = styled.select`
  padding: 0.8rem;
  margin-right: 1.25rem;

  ${mobile({
    margin: "0.8rem 0",
  })};
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
