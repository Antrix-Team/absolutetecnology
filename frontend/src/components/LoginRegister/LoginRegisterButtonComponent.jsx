import React from "react";
import tw, { styled, css } from "twin.macro";

const ButtonLoginStyle = styled.button(() => [
  tw`text-white py-2 px-4 rounded-lg transition-transform duration-500 ease-in-out`,
  css`
    background: linear-gradient(45deg, #0d3b66, #1446a0);
    border: 2px solid #6fffe9;
    box-shadow: 0 0 10px #6fffe9, 0 0 20px #6fffe9, 0 0 30px #6fffe9;
    font-family: 'Press Start 2P', cursive;
    &:hover {
      background: linear-gradient(45deg, #6fffe9, #00ffab);
      transform: scale(1.05);
      box-shadow: 0 0 15px #00ffab, 0 0 30px #00ffab, 0 0 45px #00ffab;
    }
    &:active {
      transform: scale(0.95);
      box-shadow: 0 0 5px #6fffe9, 0 0 10px #6fffe9, 0 0 15px #6fffe9;
    }
  `,
]);

const LoginButton = () => {
  return (
    <ButtonLoginStyle>
      Login
    </ButtonLoginStyle>
  );
}

export default LoginButton;
