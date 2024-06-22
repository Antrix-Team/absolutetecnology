import React from "react";
import tw, { styled, css } from "twin.macro";

const NavLink = styled.a(() => [
    tw`text-white text-lg mx-4 px-4 py-2 transition-colors duration-300`,
    css`
      position: relative;
      font-family: 'Press Start 2P', cursive;
      &:hover {
        color: #b19cd9; /* Light Pastel Purple */
        text-shadow: 0 0 5px #b19cd9, 0 0 10px #b19cd9, 0 0 15px #b19cd9;
      }
      &:before {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background-color: #b19cd9; /* Light Pastel Purple */
        transition: width 0.3s ease-in-out;
      }
      &:hover:before {
        width: 100%;
      }
    `,
  ]);
  
  const Home = styled(NavLink)``;
  const Products = styled(NavLink)``;
  const About = styled(NavLink)``;
  const Contact = styled(NavLink)``;

const NavbarDefault = () => {

    return (
        <>
            <Home href="#">Home</Home>
            <Products href="#">Products</Products>
            <About href="#">About</About>
            <Contact href="#">Contact</Contact>
        </>
    )
}

export default NavbarDefault