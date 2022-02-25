import { Send } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  min-height: 30vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 1.5rem;

  ${mobile({
    margin: "0.25rem 1rem",
  })}
`;

const Title = styled.h1`
  font-size: 4.5rem;
  margin-bottom: 1.5rem;

  ${mobile({
    fontSize: "3.5rem",
  })}
`;

const Description = styled.div`
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 1rem;

  ${mobile({
    fontSize: "1rem",
    textAlign: "center",
  })}
`;

const InputContainer = styled.div`
  width: 50%;
  height: 3.5rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid lightgray;

  ${mobile({
    width: "100%",
    minWidth: "unset",
  })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 1.5rem;
  font-size: 1.2rem;
  height: 95%;
  width: 100%;
  min-width: 5rem;

  &:active {
    outline: none;
  }
`;

const Button = styled.button`
  flex: 1;
  width: 100%;
  height: 100%;
  min-width: 4rem;
  border: none;
  background-color: teal;
  color: white;
`;

const Newsletters = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Get timely updates from your favorite products.</Description>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletters;
