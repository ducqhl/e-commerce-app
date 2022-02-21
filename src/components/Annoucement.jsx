import styled from "styled-components";

const Container = styled.div`
  height: 2rem;
  width: 100%;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 500;
`;

const Annoucement = () => {
  return <Container>Super Deal! Free Shipping on Orders Over $50</Container>;
};

export default Annoucement;
