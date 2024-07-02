/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import tw from 'twin.macro';
import axios from 'axios';
import ButtonUpdateCategoryComponent from './ButtonUpdateCategoryComponent';

const PageContainer = tw.div`min-h-screen bg-gray-100 p-8`;
const PageTitle = tw.h1`text-4xl font-bold mb-6 text-center text-gray-900`;
const Table = tw.table`min-w-full bg-white`;
const Thead = tw.thead``;
const Tbody = tw.tbody``;
const Tr = tw.tr``;
const Th = tw.th`py-2 px-4 border-b border-gray-200`;
const Td = tw.td`py-2 px-4 border-b border-gray-200`;

const ModalBackground = tw.div`fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center`;
const ModalContainer = tw.div`bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative`;
const CloseButton = tw.button`absolute top-2 right-2 text-gray-500 hover:text-gray-700`;
const FormGroup = tw.div`mb-4`;
const Label = tw.label`block text-gray-700 text-sm font-bold mb-2`;
const Input = tw.input`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none`;
const SubmitButton = tw.button`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none`;

const urlInventary = import.meta.env.VITE_URL;

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${urlInventary}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${urlInventary}/categories`, {
        category: categoryName,
        description: categoryDescription,
      });
      setIsModalOpen(false);
      setCategoryName('');
      setCategoryDescription('');
      fetchCategories();
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <PageContainer>
      <PageTitle>Gestión de Categorías</PageTitle>
      <button
        tw="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Crear Categoría
      </button>
      <Table>
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Descripción</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories.map((category) => (
            <Tr key={category._id}>
              <Td>{category.category}</Td>
              <Td>{category.description}</Td>
              <Td>
                <ButtonUpdateCategoryComponent category={category} />
                <button tw="text-red-500 hover:text-red-700 ml-4">Eliminar</button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {isModalOpen && (
        <ModalBackground>
          <ModalContainer>
            <CloseButton onClick={() => setIsModalOpen(false)}>×</CloseButton>
            <h2 tw="text-xl font-bold mb-4">Crear Categoría</h2>
            <form onSubmit={handleCreateCategory}>
              <FormGroup>
                <Label>Nombre de la Categoría</Label>
                <Input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Descripción de la Categoría</Label>
                <Input
                  type="text"
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  required
                />
              </FormGroup>
              <SubmitButton type="submit">Crear Categoría</SubmitButton>
            </form>
          </ModalContainer>
        </ModalBackground>
      )}
    </PageContainer>
  );
};

export default CategoryPage;
