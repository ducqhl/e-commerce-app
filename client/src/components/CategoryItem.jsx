import styled from "styled-components";
import React from "react";
import { mobile, tablet } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 0.5rem;
  height: 70vh;
  position: relative;

  ${mobile({
    margin: "0 1rem 0.25rem 1rem",
  })}

  ${tablet({
    height: "40vh",
  })}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  ${mobile({
    height: "40vh",
    objectPosition: "center -8rem",
  })}
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 2rem;

  ${mobile({
    marginBottom: "1rem",
  })}
`;

const Button = styled.button`
  border: none;
  padding: 0.8rem;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;

const CategoryItem = ({ category }) => {
  return (
    <Container>
      <Link to={`products/${category.name}#`}>
        <Image src={category.img} />
        <Info>
          <Title>{category.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
