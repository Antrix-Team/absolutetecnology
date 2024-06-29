/** @jsxImportSource @emotion/react */
import tw from "twin.macro";
import useEmployeList from "../../hooks/EmployeListHooks/EmployeListHook";

const EmployeListComponent = () => {
    const { employees, loading, error, searchTerm, setSearchTerm, handleSearch } = useEmployeList();

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
                    tw="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 focus:outline-none"
                >
                    Buscar
                </button>
            </div>
            <table tw="table-auto w-full border-collapse border border-gray-200">
                <thead>
                    <tr tw="bg-gray-100">
                        <th tw="border px-4 py-2 text-left text-gray-600 font-medium">Nombre</th>
                        <th tw="border px-4 py-2 text-left text-gray-600 font-medium">Apellido</th>
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
                                    <button tw="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 focus:outline-none w-full">Actualizar</button>
                                    <button tw="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:outline-none w-full">Eliminar</button>
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
