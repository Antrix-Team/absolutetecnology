import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
import LoginPage from "../LoginPage/LoginPage";
import HeaderDefault from "../../components/header/HeaderComponent";
import HomePage from "../HomePage/HomePage";
import EmployeListPage from "../EmployeListPage/EmployeListPage";
import LoginRegisterPage from "../LoginRegisterPage/LoginRegisterPage";
import ProductListPage from "../ProductPage/ProductPage";
import ForgotPasswordPage from "../ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "../ResetPasswordPage/ResetPasswordPage"; 


const PrivateRoute = ({ element: Component }) => {
    const token = Cookies.get('token');
    console.log("Token from cookie:", token);
    return token ? <Component /> : <Navigate to="/" />;
};

const DashboardPage = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password/:token" element={<ResetPasswordPage />} /> 
                <Route path="/dashboard" element={<HeaderDefault />}>
                    <Route index element={<HomePage />} />
                    <Route path="products" element={<ProductListPage />} />
                    <Route path="employees" element={<EmployeListPage />} />
                    <Route path="register" element={<LoginRegisterPage />} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default DashboardPage;
