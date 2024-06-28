/** @jsxImportSource @emotion/react */
import tw from "twin.macro";
import useEmployeList from "../../hooks/EmployeListHooks/EmployeListHook";

const EmployeListComponent = () => {
    const { employees, loading, error, searchTerm, setSearchTerm, handleSearch } = useEmployeList();

    if (loading) return <div tw="text-center mt-4">Cargando...</div>;
    if (error) return <div tw="text-center mt-4 text-red-500">Error: {error}</div>;

    return (
        <div tw="container mx-auto p-4">
            <h2 tw="text-xl font-semibold mb-4">Lista de Empleados</h2>
            <div tw="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Buscar por carnet"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
                    tw="border rounded-l px-4 py-2 flex-grow"
                />
                <button
                    onClick={() => handleSearch(searchTerm)}
                    tw="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-700"
                >
                    Buscar
                </button>
            </div>
            <table tw="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th tw="border px-4 py-2">Nombre</th>
                        <th tw="border px-4 py-2">Apellido</th>
                        <th tw="border px-4 py-2">Teléfono</th>
                        <th tw="border px-4 py-2">Carnet</th>
                        <th tw="border px-4 py-2">acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id} tw="hover:bg-gray-100">
                            <td tw="border px-4 py-2">{employee.name}</td>
                            <td tw="border px-4 py-2">{employee.middlename}</td>
                            <td tw="border px-4 py-2">{employee.phone}</td>
                            <td tw="border px-4 py-2">{employee.carnet}</td>
                            <td tw="border px-4 py-2"><button>eliminar</button><th></th><button>actualizar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeListComponent;
