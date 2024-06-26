// src/hooks/EmployeListHooks/EmployeListHooks.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeListProvider from '../../api/EmployeListProvider/EmployeListProvider';

const useEmployeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await EmployeListProvider();
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      if (err.message.includes('Sesión expirada') || err.message.includes('no autorizada')) {
        // Redirigir al usuario a la página de login
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  return { employees, loading, error };
};

export default useEmployeList;