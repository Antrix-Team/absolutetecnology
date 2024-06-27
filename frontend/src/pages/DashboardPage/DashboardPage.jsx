import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";
import HeaderDefault from "../../components/header/HeaderComponent";
import HomePage from "../HomePage/HomePage";
import EmployeListPage from "../EmployeListPage/EmployeListPage";

const PrivateRoute = ({ element: Component }) => {
    const token = localStorage.getItem('accessToken');
    return token ? <Component /> : <Navigate to="/" />;
};

const DashboardPage = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<PrivateRoute element={HeaderDefault} />}>
          <Route index element={<HomePage />} />
          <Route path="employees" element={<EmployeListPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default DashboardPage;
