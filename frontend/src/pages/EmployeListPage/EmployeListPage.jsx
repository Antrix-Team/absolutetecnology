import React from 'react';
import EmployeListComponent from "../../components/EmployeListComponent/EmployeListComponent";
import { Link } from 'react-router-dom';
import tw from 'twin.macro';

const EmployeListPage = () => {
    return (
        <div tw="flex flex-col items-center">
            <Link to="/dashboard/register" tw="mb-4">
                <button tw="mb-4 bg-[#0568a6] text-white font-bold py-2 px-4 rounded">Agregar Usuario</button>
            </Link>
            <EmployeListComponent />
        </div>
    );
};

export default EmployeListPage;
