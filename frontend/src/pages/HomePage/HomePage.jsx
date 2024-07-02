/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import tw from 'twin.macro';
import axios from 'axios';

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
const Select = tw.select`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none`;
const SubmitButton = tw.button`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none`;

const urlInventary = import.meta.env.VITE_URL;

const SubcategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [subcategoryName, setSubcategoryName] = useState('');
  const [subcategoryDescription, setSubcategoryDescription] = useState('');

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${urlInventary}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(`${urlInventary}/subcategories`);
      setSubcategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  const handleSubcategorySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${urlInventary}/subcategories`, {
        subcategory: subcategoryName,
        description: subcategoryDescription,
        categoryId: selectedCategoryId,
      });
      setSubcategoryName('');
      setSubcategoryDescription('');
      setSelectedCategoryId('');
      fetchSubcategories();
    } catch (error) {
      console.error('Error creating subcategory:', error);
    }
  };

  return (
    <PageContainer>
      <PageTitle>Página de Subcategorías</PageTitle>
      <button
        tw="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6"
        onClick={() => setIsModalOpen(true)}
      >
        Agregar Subcategoría
      </button>
      {isModalOpen && (
        <ModalBackground>
          <ModalContainer>
            <CloseButton onClick={() => setIsModalOpen(false)}>×</CloseButton>
            <h2 tw="text-xl font-bold mb-4">Agregar Subcategoría</h2>
            <form onSubmit={handleSubcategorySubmit}>
              <FormGroup>
                <Label>Seleccionar Categoría</Label>
                <Select
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Selecciona una categoría
                  </option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.category}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Nombre de la Subcategoría</Label>
                <Input
                  type="text"
                  value={subcategoryName}
                  onChange={(e) => setSubcategoryName(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Descripción de la Subcategoría</Label>
                <Input
                  type="text"
                  value={subcategoryDescription}
                  onChange={(e) => setSubcategoryDescription(e.target.value)}
                  required
                />
              </FormGroup>
              <SubmitButton type="submit">Agregar Subcategoría</SubmitButton>
            </form>
          </ModalContainer>
        </ModalBackground>
      )}
      <Table>
        <Thead>
          <Tr>
            <Th>Categoría</Th>
            <Th>Subcategoría</Th>
            <Th>Descripción</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {subcategories.map((subcategory) => (
            <Tr key={subcategory._id}>
              <Td>{subcategory.category.category}</Td>
              <Td>{subcategory.subcategory}</Td>
              <Td>{subcategory.description}</Td>
              <Td>
                <button tw="text-blue-500 hover:text-blue-700">Actualizar</button>
                <button tw="text-red-500 hover:text-red-700 ml-4">Eliminar</button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </PageContainer>
  );
};

export default SubcategoryPage;
