import React, { useCallback } from "react";
import tw from "twin.macro";
import useEmployeList from "../../hooks/EmployeListHooks/EmployeListHook";
import ButtonDeleteEmployeeComponent from "../ButtonDeleteEmployeeComponent/ButtonDeleteEmployeeComponent";

const EmployeListComponent = () => {
  const { employees, loading, error, searchTerm, setSearchTerm, handleSearch, setEmployees } = useEmployeList();

  const handleDeleteEmployee = useCallback(async (employeeId) => {
    try {
      setEmployees((prevEmployees) => prevEmployees.filter(employee => employee._id !== employeeId));
    } catch (error) {
      console.error("Error eliminando el empleado:", error);
    }
  }, [setEmployees]);

  if (loading) return <div tw="text-center mt-4">Cargando...</div>;
  if (error) return <div tw="text-center mt-4 text-red-500">Error: {error}</div>;

  return (
    <div tw="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 tw="text-2xl font-bold mb-6 text-gray-800">Lista de Empleados</h2>
      <div tw="flex items-center mb-6">
        <input
          type="text"
          placeholder="Buscar por carnet"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
          tw="border border-gray-300 rounded-l px-4 py-2 flex-grow focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={() => handleSearch(searchTerm)}
          tw="bg-[#0568a6] text-white px-4 py-2 rounded-r hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>
      <table tw="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr tw="bg-gray-100">
            <th tw="border px-4 py-2 text-left text-gray-600 font-medium">Nombres</th>
            <th tw="border px-4 py-2 text-left text-gray-600 font-medium">Apellidos</th>
            <th tw="border px-4 py-2 text-left text-gray-600 font-medium">Teléfono</th>
            <th tw="border px-4 py-2 text-left text-gray-600 font-medium">Carnet</th>
            <th tw="border px-4 py-2 text-center text-gray-600 font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id} tw="hover:bg-gray-50">
              <td tw="border px-4 py-2 text-gray-700">{employee.name}</td>
              <td tw="border px-4 py-2 text-gray-700">{employee.middlename}</td>
              <td tw="border px-4 py-2 text-gray-700">{employee.phone}</td>
              <td tw="border px-4 py-2 text-gray-700">{employee.carnet}</td>
              <td tw="border px-4 py-2 text-center">
                <div tw="flex flex-col items-center space-y-2">
                  <button tw="bg-[#077F8C] text-white px-2 py-1 rounded mb-2 text-center w-24">
                    Actualizar
                  </button>
                  <ButtonDeleteEmployeeComponent employeeId={employee._id} onDelete={handleDeleteEmployee} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeListComponent;