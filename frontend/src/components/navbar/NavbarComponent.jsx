import React from 'react';
import { Link } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';

// Estiliza el componente NavLink
const NavLink = styled(Link)(() => [
  tw`text-white text-lg mx-4 px-4 py-2 transition-colors duration-300`,
  css`
    position: relative;
    font-family: 'Arial', sans-serif;
    &:hover {
      color: #3498db; /* Azul empresarial */
      text-shadow: 0 0 5px #3498db, 0 0 10px #3498db, 0 0 15px #3498db;
    }
    &:before {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: #3498db; /* Azul empresarial */
      transition: width 0.3s ease-in-out;
    }
    &:hover:before {
      width: 100%;
    }
  `,
]);

const ButtonAddUser = styled.button(() => [
  tw`bg-blue-600 text-white text-lg px-4 py-2 rounded transition-colors duration-300`,
  css`
    font-family: 'Arial', sans-serif;
    &:hover {
      background-color: #2980b9; /* Azul oscuro al pasar el cursor */
      box-shadow: 0 0 5px #2980b9, 0 0 10px #2980b9, 0 0 15px #2980b9;
    }
  `,
]);

const HomeLink = styled(NavLink)``;
const ProductsLink = styled(NavLink)``;
const ProviderLink = styled(NavLink)``;
const UsersLink = styled(NavLink)``;
const AddUserModal = styled(ButtonAddUser)``;

const NavbarContainer = styled.div(() => [
  tw`w-full bg-gray-800 p-4 flex justify-between items-center shadow-lg`,
]);

const Logo = styled.div(() => [
  tw`text-white text-2xl font-bold`,
]);

const NavLinksContainer = styled.div(() => [
  tw`flex items-center`,
]);

const NavbarDefault = () => {
  return (
    <NavbarContainer>
      <Logo>logo</Logo>
      <NavLinksContainer>
        <HomeLink to="/dashboard">Home</HomeLink>
        <ProductsLink to="/dashboard/products">Products</ProductsLink>
        <ProviderLink to="/dashboard">Providers</ProviderLink>
        <UsersLink to="/dashboard/employees">Users</UsersLink>
        <AddUserModal>Register</AddUserModal>
      </NavLinksContainer>
    </NavbarContainer>
  );
}

export default NavbarDefault;
