import styled from "styled-components";
import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import React from "react";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;

  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const Container = styled.div`
  flex: 1;
  margin: 0.5rem;
  height: 20rem;
  min-width: 20rem;
  height: 22rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  ${mobile({
    margin: "0.5rem 0rem",
  })}
`;

const Circle = styled.div`
  height: 20rem;
  width: 20rem;
  border-radius: 50%;
  background-color: white;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Image = styled.img`
  height: 80%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: white;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.58rem;

  transition: all 0.3s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.2);
  }
`;

const Product = ({ product }) => {
  return (
    <Container>
      <Circle>
        <Image src={product.img} />
      </Circle>
      <Info>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        <Link to={`/product/${product._id}`}>
          <Icon>
            <SearchOutlined />
          </Icon>
        </Link>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
