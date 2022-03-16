import { Add, Remove } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Annoucement from "../components/Annoucement";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { addProduct, removeProduct } from "../redux/cart";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import * as api from "../api";
import { useNavigate } from "react-router-dom";

const PUBLIC_KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 1.5rem;

  ${mobile({ padding: "0.5rem" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;

  ${mobile({ padding: "1rem" })}
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 0.8rem;
`;

const TopButton = styled.button`
  padding: 0.8rem;
  font-weight: 600;
  cursor: pointer;

  border: ${(props) => props.filled && "none"};
  background-color: ${(props) => (props.filled ? "black" : "transparent")};
  color: ${(props) => props.filled && "white"};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;

  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;

  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 12rem;
  padding: 1rem;
`;

const Details = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
`;

const ProductAmount = styled.div`
  font-size: 1.2rem;
  margin: 0.5rem;

  ${mobile({ margin: "0.2rem 1rem" })}
`;

const ProductPrice = styled.div`
  font-size: 1.8rem;
  font-weight: 200;

  ${mobile({ marginBottom: "1.2rem" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 0.8rem;
  padding: 1.5rem;
  min-height: 29vh;

  ${mobile({ minHeight: "unset" })}
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 1.5rem 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "1.2rem"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: black;
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
`;

const Cart = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [stripeToken, setStripeToken] = useState(null);

  const total = cart.products.reduce(
    (total, product, index) => total + product.price * product.quantity,
    0,
  );

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await api.checkout({
          tokenId: stripeToken.id,
          amount: total * 100,
        });

        navigate("/success",  {
          stripeData: res.data,
          products: cart, });
      } catch (error) {}
    };

    cart && total > 0  && stripeToken && makeRequest();
  }, [navigate, stripeToken, total, cart]);

  const handleRemoveProduct = (product) => {
    if (product.quantity === 1) dispatch(removeProduct(product._id));
    else {
      dispatch(addProduct({ ...product, quantity: product.quantity - 1 }));
    }
  };

  const handleAddProduct = (product) => {
    dispatch(addProduct({ ...product, quantity: product.quantity + 1 }));
  };

  return (
    <Container>
      <Annoucement />
      <NavBar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag({cart.products.length})</TopText>
            <TopText>Your Wishlist(0)</TopText>
          </TopTexts>
          <TopButton filled>CHECK OUT</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <>
                <Product>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId>
                      <ProductColor color={product.color} />
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add onClick={() => handleAddProduct(product)} />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Remove onClick={() => handleRemoveProduct(product)} />
                    </ProductAmountContainer>
                    <ProductPrice>
                      $ {product.price * product.quantity}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
                <Hr />
              </>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 20</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>-$ 20</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="LAMON Shop"
              image="https://scontent.fsgn5-8.fna.fbcdn.net/v/t1.6435-9/119610126_329382034806597_6298602612211921019_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=174925&_nc_ohc=WldbaJ-RvP0AX_eL4xe&_nc_ht=scontent.fsgn5-8.fna&oh=00_AT-viaeH2mLUL611sx4Vwzv-y4xfcVldiMn5o8O8HwKJog&oe=6254568C"
              billingAddress
              shippingAddress
              description={`Your total is $${total}`}
              amount={total * 100} // stripe using cen as unit
              token={onToken}
              stripeKey={PUBLIC_KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
