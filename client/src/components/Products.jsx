import styled from "styled-components";
import React, { useEffect, useState } from "react";
import Product from "./Product";
import { mobile } from "../responsive";
import * as api from "../api";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1.2rem;
  justify-content: space-between;

  ${mobile({
    padding: "0.25rem 1rem",
  })}
`;

const Products = ({ category, filters, sort, search }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await api.getProducts(category, search);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, [category, search]);

  useEffect(() => {
    category &&
      setFilteredProducts(
        products?.filter((p) =>
          Object.entries(filters).every(
            ([key, value]) => value === "" || p[key]?.includes(value),
          ),
        ),
      );
  }, [category, products, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt < b.createdAt),
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price),
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price),
      );
    }
  }, [sort]);

  const renderProducts = category ? filteredProducts : products.slice(0, 8);

  return (
    <Container>
      {renderProducts?.map((product) => (
        <Product product={product} key={product._id} />
      ))}
    </Container>
  );
};

export default Products;
