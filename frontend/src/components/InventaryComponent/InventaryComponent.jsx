/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import tw from 'twin.macro';
import useInventary from '../../hooks/InventaryHooks/InventaryHooks';

const Container = tw.div`container mx-auto p-4`;
const Title = tw.h1`text-3xl font-bold mb-6 text-gray-800`;
const ErrorMessage = tw.p`text-red-500 mb-4`;
const Form = tw.form`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4`;
const InputGroup = tw.div`mb-4`;
const Label = tw.label`block text-gray-700 text-sm font-bold mb-2`;
const Input = tw.input`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500`;
const Select = tw.select`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500`;
const ErrorText = tw.p`text-red-500 text-xs italic`;
const Button = tw.button`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500`;
const Table = tw.table`min-w-full bg-white border mt-4`;
const Th = tw.th`py-2 px-4 border-b bg-gray-100 text-left text-gray-600 font-bold`;
const Td = tw.td`py-2 px-4 border-b`;

const InventaryComponent = () => {
  const { inventories, products, createInventary, error, validationErrors } = useInventary();
  const [formData, setFormData] = useState({
    stock: '',
    productId: '',
    unitPrice: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createInventary(formData);
      setFormData({ stock: '', productId: '', unitPrice: '' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Title>Inventario</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="stock">Stock</Label>
          <Input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
            id="stock"
          />
          {validationErrors.stock && <ErrorText>{validationErrors.stock}</ErrorText>}
        </InputGroup>
        <InputGroup>
          <Label htmlFor="productId">Producto</Label>
          <Select
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            id="productId"
          >
            <option value="">Seleccionar Producto</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </Select>
          {validationErrors.productId && <ErrorText>{validationErrors.productId}</ErrorText>}
        </InputGroup>
        <InputGroup>
          <Label htmlFor="unitPrice">Precio Unitario</Label>
          <Input
            type="number"
            name="unitPrice"
            value={formData.unitPrice}
            onChange={handleChange}
            placeholder="Unit Price"
            id="unitPrice"
          />
          {validationErrors.unitPrice && <ErrorText>{validationErrors.unitPrice}</ErrorText>}
        </InputGroup>
        <Button type="submit">Crear Inventario</Button>
      </Form>
      <Table>
        <thead>
          <tr>
            <Th>Código</Th>
            <Th>Stock</Th>
            <Th>Precio Unitario</Th>
          </tr>
        </thead>
        <tbody>
          {inventories.map((inventory) => (
            <tr key={inventory._id}>
              <Td>{inventory.code}</Td>
              <Td>{inventory.stock}</Td>
              <Td>{inventory.unitPrice}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default InventaryComponent;
