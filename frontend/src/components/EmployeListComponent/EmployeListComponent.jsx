
import useEmployeList from '../../hooks/EmployeListHooks/EmployeListHook';

const EmployeListComponent = () => {
  const { employees, loading, error, searchTerm, setSearchTerm, handleSearch } = useEmployeList();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Lista de Empleados</h2>
      <input
        type="text"
        placeholder="Buscar por carnet"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
      />
      <button onClick={() => handleSearch(searchTerm)}>Buscar</button>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            {employee.name} - {employee.email} - Carnet: {employee.carnet}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeListComponent;