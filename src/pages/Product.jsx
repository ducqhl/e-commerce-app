import { Add, Remove } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import Annoucement from "../components/Annoucement";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Newsletters from "../components/Newsletters";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 1.5rem;
  display: flex;
`;

const ImageContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 3rem;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Description = styled.p`
  margin: 1.5rem 0;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 2.5rem;
`;

const FilterContainer = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
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
  font-size: 1.5rem;
  font-weight: 200;
  margin-right: 1rem;
  min-width: 4rem;
`;

const FilterColor = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 0.5rem;
  cursor: pointer;

  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const FilterSize = styled.select`
  padding: 0.5rem;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
  return (
    <Container>
      <Annoucement />
      <NavBar />
      <Wrapper>
        <ImageContainer>
          <Image src="https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png" />
        </ImageContainer>
        <InfoContainer>
          <Title>AAA</Title>
          <Description>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
            voluptate quisquam, similique nesciunt id eveniet eaque, tempore,
            tempora culpa distinctio ratione inventore consectetur fugit quas ab
            repellendus omnis suscipit repellat vero nam.
          </Description>
          <Price>$ 20</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color="black" />
              <FilterColor color="blue" />
              <FilterColor color="darkblue" />
              <FilterColor color="gray" />
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove />
              <Amount>1</Amount>
              <Add />
            </AmountContainer>
            <Button>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletters />
      <Footer />
    </Container>
  );
};

export default Product;
