import { Send } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 60vh;
  width: 100vw;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 1.5rem;
`;

const Title = styled.h1`
  font-size: 5rem;
  margin-bottom: 1.5rem;
`;

const Description = styled.div`
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 1rem;
`;
const InputContainer = styled.div`
  width: 50%;
  min-width: 20rem;
  height: 4rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid lightgray;
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 1.5rem;
  font-size: 1.5rem;
  height: 95%;
  width: 100%;

  &:active {
    outline: none;
  }
`;

const Button = styled.button`
  flex: 1;
  height: 100%;
  border: none;
  background-color: teal;
  color: white;
  min-width: 3rem;
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
