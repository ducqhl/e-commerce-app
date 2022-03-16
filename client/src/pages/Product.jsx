import { Add, Remove } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Annoucement from "../components/Annoucement";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Newsletters from "../components/Newsletters";
import { mobile, tablet } from "../responsive";
import * as api from "../api";
import { addProduct } from "../redux/cart";
import { useDispatch } from "react-redux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 1.5rem;
  display: flex;

  ${mobile({
    padding: "0.5rem",
    flexDirection: "column",
  })}
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  max-width: 30rem;
  height: 80vh;
  object-fit: cover;

  ${mobile({
    width: "50vw",
    height: "30vh",
  })}

  ${tablet({
    height: "60vh",
  })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 3rem;

  ${mobile({ padding: "0.5rem" })}
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 200;
`;

const Description = styled.p`
  margin: 1.5rem 0;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 1.5rem;
`;

const FilterContainer = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
  margin-right: 2rem;
`;

const FilterTitle = styled.span`
  font-size: 1.2rem;
  font-weight: 200;
  margin-right: 1rem;
  min-width: 4rem;
`;

const FilterColor = styled.div`
  width: ${(props) => (props.isSelected ? "2.1rem" : "1.5rem")};
  height: ${(props) => (props.isSelected ? "2.1rem" : "1.5rem")};
  border-radius: 50%;
  background-color: ${(props) => props.color};
  box-shadow: 0px 0px 5px 0px
    rgba(0, 0, 0, ${(props) => (props.isSelected ? "0.5" : "0.2")});
  margin-right: 0.5rem;
  cursor: pointer;

  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }

  border: ${(props) => (props.isError ? "3px solid red" : "none")};
`;

const FilterSize = styled.select`
  padding: 0.5rem;
  border: ${(props) => (props.isError ? "3px solid red" : "")};
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  ${mobile({
    width: "100%",
    justifyContent: "space-between",
  })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: 700;
  min-width: 8rem;
`;

const Amount = styled.span`
  width: 2rem;
  height: 2rem;
  border-radius: 0.8rem;
  border: 1px solid teal;

  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.5rem;
`;

const Button = styled.button`
  padding: 1rem;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 700;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setColor] = useState("");
  const [selectedSize, setSize] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await api.getProduct(id);
        setProduct(data);
      } catch (error) {}
    };

    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") quantity > 1 && setQuantity((prev) => prev - 1);
    else {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    setSubmitted(true);

    if (!selectedColor || !selectedSize) return;

    dispatch(
      addProduct({
        ...product,
        color: selectedColor,
        size: selectedSize,
        quantity,
      }),
    );
  };

  return (
    <Container>
      <Annoucement />
      <NavBar />
      <Wrapper>
        <ImageContainer>
          <Image src={product.img} />
        </ImageContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Description>{product.desc}</Description>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product?.color?.map((c) => (
                <FilterColor
                  isError={submitted && !selectedColor}
                  color={c}
                  onClick={() => setColor(c)}
                  isSelected={selectedColor === c}
                />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize
                onChange={(e) => setSize(e.target.value)}
                isError={submitted && !selectedSize}
              >
                <FilterSizeOption disabled selected value=""></FilterSizeOption>
                {product?.size?.map((size) => (
                  <FilterSizeOption key={size}>{size}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleAddToCart}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletters />
      <Footer />
    </Container>
  );
};

export default Product;
