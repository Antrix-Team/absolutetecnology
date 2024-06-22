import React from "react";
import tw, { styled, css } from "twin.macro";
import NavbarDefault from "../navbar/NavbarComponent";
import LoginButton from "../LoginRegister/LoginRegisterButtonComponent";
const Header = styled.header(({ isHovered }) => [
  tw`bg-purple-900 text-white rounded-2xl shadow-2xl flex justify-center items-center transition-transform duration-500 ease-in-out p-4`,
  isHovered && tw`transform scale-95`,
  css`
    border: 3px solid transparent;
    background-image: linear-gradient(45deg, #342a54, #44337a); /* Dark Purple Gradient */
    border-image: linear-gradient(45deg, #3e475b, #5a6983) 1; /* Nocturnal Green to Blue Gradient */
    font-family: 'Press Start 2P', cursive;
    &:hover {
      border-image: linear-gradient(45deg, #4e5d94, #3b4d6e) 1; /* Light Nocturnal Blue to Green Gradient */
    }
  `,
]);

const HeaderDefault = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Header
      isHovered={isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <NavbarDefault/>
      <LoginButton/>
    </Header>
  );
};

export default HeaderDefault;
