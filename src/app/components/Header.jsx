"use clinet";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Center from "./Center";
import { CartContext } from "./CartContext";

const StyledHeader = styled.header`
  background-color: #222;
  color: white;
`;
const Logo = styled(Link)`
  color: white;
  padding: 5px;
  margin: 5px;
  font-size: 1.5rem;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 15px;
`;
const Header = () => {
  const { cartProducts, setCartProducts } = useContext(CartContext);
  return (
      <StyledHeader>
        <Center>
          <Wrapper>
            <Logo href={"/"}>Ecommerce</Logo>
            <StyledNav>
              <Logo href={"/"}>Home</Logo>
              <Logo href={"/products"}>Products</Logo>
              <Logo href={"/catagories"}>Catagories</Logo>
              <Logo href={"/account"}>Account</Logo>
              <Logo href={"/cart"}>Cart ({cartProducts?.length})</Logo>
            </StyledNav>
          </Wrapper>
        </Center>
      </StyledHeader>
  );
};

export default Header;
