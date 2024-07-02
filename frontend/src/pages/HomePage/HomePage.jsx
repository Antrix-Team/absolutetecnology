import React from 'react';
import tw, { styled, css } from 'twin.macro';

const HomePageContainer = styled.div(() => [
  tw`flex flex-col items-center justify-center min-h-screen bg-gray-100`,
]);

const HeroSection = styled.section(() => [
  tw`w-full bg-blue-800 text-white py-20 flex flex-col items-center justify-center`,
  css`
    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  `,
]);

const HeroTitle = styled.h1(() => [
  tw`text-5xl font-bold mb-4`,
  css`
    font-family: 'Arial', sans-serif;
  `,
]);

const HeroSubtitle = styled.p(() => [
  tw`text-lg mb-8`,
]);

const ButtonPrimary = styled.button(() => [
  tw`bg-blue-600 text-white text-lg px-6 py-3 rounded transition-colors duration-300`,
  css`
    font-family: 'Arial', sans-serif;
    &:hover {
      background-color: #2563eb; /* Azul más oscuro */
    }
  `,
]);

const HomePage = () => {
  return (
    <HomePageContainer>
      <HeroSection>
        <HeroTitle>Welcome to MyCompany Absolute Technology</HeroTitle>
        <HeroSubtitle>Your trusted partner in business solutions</HeroSubtitle>
        <ButtonPrimary>Learn More</ButtonPrimary>
      </HeroSection>
      
    </HomePageContainer>
  );
};

export default HomePage;
