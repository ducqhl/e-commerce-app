import React from "react";
import styled from "styled-components";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { useState } from "react";

import { sliderItems } from "../data.js";
import { mobile } from "../responsive.js";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 40rem;
  display: flex;
  position: relative;
  overflow: hidden;

  ${mobile({
    display: "none",
  })}
`;

const Arrow = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: #fff7f7;
  border-radius: 50%;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "1rem"};
  right: ${(props) => props.direction === "right" && "1rem"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  transition: all 1.5s ease;
  transform: translateX(${(props) => Number(props.slideIndex) * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg || "white"};
`;

const ImageContainer = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: flex-end;
  padding-right: 10%;
  align-items: center;
`;

const Image = styled.img`
  height: 80%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding-right: 10%;
`;

const Title = styled.h1`
  font-size: 4rem;
`;

const Description = styled.p`
  margin: 3rem 0;
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 3rem;
  letter-spacing: 0.2rem;
`;

const Button = styled(Link)`
  padding: 0.8rem;
  font-size: 1.2rem;
  background-color: transparent;
  cursor: pointer;
  color: black;
  text-decoration: none;
  border: 2px solid black;
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : sliderItems.length - 1,
      );
    } else {
      setSlideIndex((prevIndex) =>
        prevIndex < sliderItems.length - 1 ? prevIndex + 1 : 0,
      );
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems?.map((slide) => (
          <Slide bg={slide.bg} key={slide.id}>
            <ImageContainer>
              <Image
                src={
                  slide.image ||
                  "https://www.nicepng.com/png/full/76-768169_drawing-fashion-illustration-girl-pencil-sketch-dibujo-a.png"
                }
              />
            </ImageContainer>
            <InfoContainer>
              <Title>{slide.title}</Title>
              <Description>{slide.description}</Description>
              <Button to={`/products/${slide.category}`}>
                {slide.buttonText || "SHOW NOW"}
              </Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
