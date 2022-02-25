import styled from "styled-components";
import React from "react";
import { popularProducts } from "../data";
import Product from "./Product";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1.2rem;
  justify-content: space-between;

  ${mobile({
    padding: "0.25rem 1rem",
  })}
`;

const Products = () => {
  return (
    <Container>
      {popularProducts.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </Container>
  );
};

export default Products;
