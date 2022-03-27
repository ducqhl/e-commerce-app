import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Annoucement from "../components/Annoucement";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Newsletters from "../components/Newsletters";
import Products from "../components/Products";
import useQuery from "../hooks/useQuery";
import { mobile } from "../responsive";

const Container = styled.div``;

const Title = styled.h1`
  font-size: 2rem;
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
  const { category } = useParams();
  const search = useQuery().get("search"); 
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  console.log(sort);

  return (
    <Container>
      <Annoucement />
      <NavBar />
      <Title>{category?.toLocaleUpperCase()}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option value="" selected>
              Color
            </Option>
            <Option value="white">White</Option>
            <Option value="black">Black</Option>
            <Option value="red">Red</Option>
            <Option value="blue">Blue</Option>
            <Option value="yellow">Yellow</Option>
            <Option value="green">Green</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option value="" selected>
              Size
            </Option>
            <Option>L</Option>
            <Option>XL</Option>
            <Option>S</Option>
            <Option>XS</Option>
            <Option>M</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select name="sort" onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (ascending)</Option>
            <Option value="desc">Price (descending)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products
        category={category}
        filters={filters}
        sort={sort}
        search={search}
      />
      <Newsletters />
      <Footer />
    </Container>
  );
};

export default ProductList;
