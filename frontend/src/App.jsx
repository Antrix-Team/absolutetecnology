import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import HeaderDefault from "./components/header/HeaderComponent";
import EmployeListPage from "./pages/EmployeListPage/EmployeListPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<HeaderDefault />}>
          <Route path="employees" element={<EmployeListPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;