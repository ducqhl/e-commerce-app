import styled from "styled-components";
import { ShoppingBagOutlined } from "@mui/icons-material";
import Search from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 5rem;

  ${mobile({
    height: "3rem",
  })}
`;

const Wrapper = styled.div`
  display: flex;
  padding: 0.8rem 1.2rem;
  align-items: center;
  justify-content: space-between;

  ${mobile({
    padding: "0.5rem",
  })}
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const Language = styled.span`
  font-size: 14px;

  ${mobile({
    display: "none",
  })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;

  ${mobile({
    marginLeft: "0",
  })}
`;

const Input = styled.input`
  border: none;

  ${mobile({
    width: "3.2rem",
  })}
`;

const SearchIcon = styled(Search)`
  font-size: 1rem;
  color: gray;
`;

const Logo = styled.h1`
  font-size: 3rem;
  font-weight: bold;

  ${mobile({
    fontSize: "1.5rem",
  })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  ${mobile({
    flex: "2",
    justifyContent: "center",
  })}
`;

const MenuItem = styled.div`
  font-size: 1rem;
  cursor: pointer;
  margin-left: 1rem;

  ${mobile({
    fontSize: "0.8rem",
    marginLeft: "0.5rem",
  })}
`;

const NavBar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <SearchIcon />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>.LAMA</Logo>
        </Center>
        <Right>
          <MenuItem>REGISTER</MenuItem>
          <MenuItem>SIGN IN</MenuItem>
          <MenuItem>
            <Badge badgeContent={4}>
              <ShoppingBagOutlined />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default NavBar;
