import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";
import HeaderDefault from "../../components/header/HeaderComponent";
import HomePage from "../HomePage/HomePage";
import EmployeListPage from "../EmployeListPage/EmployeListPage";

const PrivateRoute = ({ element: Component }) => {
    // Obtén el token desde la cookie
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
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
