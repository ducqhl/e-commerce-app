import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@mui/icons-material";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`;

const Logo = styled.h1``;

const Description = styled.p`
  margin: 1.5rem 0;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1.5rem;

  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  color: white;
  background-color: ${(props) => props.bg};
`;

const Center = styled.div`
  flex: 1;
  padding: 1.5rem;
`;

const Title = styled.h3`
  margin-bottom: 2rem;
`;

const List = styled.ul`
  margin: 0%;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 0.8rem;
`;

const Right = styled.div`
  flex: 1;
  padding: 1.5rem;
`;

const ContactItem = styled.div`
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
`;

const RoomIcon = styled(Room)`
  margin-right: 0.8rem;
`;

const PhoneIcon = styled(Phone)`
  margin-right: 0.8rem;
`;
const MailOutlineIcon = styled(MailOutline)`
  margin-right: 0.8rem;
`;

const Payment = styled.img``;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>.LAMA</Logo>
        <Description>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </Description>
        <SocialContainer>
          <SocialIcon bg="#3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon bg="#E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon bg="#55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon bg="#E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>

      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <RoomIcon /> 622 Dixie Path , South Tobinchester 98336
        </ContactItem>
        <ContactItem>
          <PhoneIcon /> +1 234 56 78
        </ContactItem>
        <ContactItem>
          <MailOutlineIcon /> contact@lama.dev
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
