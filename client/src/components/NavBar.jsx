import styled from "styled-components";
import { ShoppingBagOutlined } from "@mui/icons-material";
import Search from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import { mobile, tablet } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const Container = styled.div`
  height: 5rem;

  ${mobile({
    height: "100%",
  })}

  ${tablet({
    height: "100%",
  })}
`;

const Wrapper = styled.div`
  display: flex;
  padding: 0.8rem 1.2rem;
  align-items: center;
  justify-content: space-between;

  ${mobile({
    padding: "0.5rem 0",
  })}

  ${tablet({
    flexDirection: "column",
  })}
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const Language = styled.span`
  font-size: 1rem;
  cursor: pointer;

  ${mobile({
    display: "none",
  })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 1.5rem;

  ${mobile({
    width: "5.5rem",
    marginLeft: "1rem",
  })};
`;

const Input = styled.input`
  border: none;
  height: 2rem;

  ${mobile({ width: "100%" })}
`;

const SearchIcon = styled(Search)`
  font-size: 1rem;
  color: gray;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  color: black;
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

const MenuItem = styled(Link)`
  font-size: 1rem;
  cursor: pointer;
  margin-left: 1.5rem;
  color: black;
  text-decoration: none;

  ${mobile({
    fontSize: "0.8rem",
    marginLeft: "0.5rem",
  })};
`;

const NavBar = () => {
  const products = useSelector((state) => state.cart.products);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && search) navigate("/products?search=" + search);
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <SearchIcon />
          </SearchContainer>
        </Left>
        <Center>
          <LogoLink to="/">
            <Logo>.LAMON</Logo>
          </LogoLink>
        </Center>
        <Right>
          <MenuItem to="/register">REGISTER</MenuItem>
          <MenuItem to="/login">SIGN IN</MenuItem>
          <MenuItem to="/cart">
            <Badge badgeContent={products?.length} color="primary">
              <ShoppingBagOutlined />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default NavBar;
