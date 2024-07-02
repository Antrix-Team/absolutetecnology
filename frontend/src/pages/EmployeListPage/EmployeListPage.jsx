import React from 'react';
import EmployeListComponent from "../../components/EmployeListComponent/EmployeListComponent";
import { Link } from 'react-router-dom';
import tw from 'twin.macro';

const EmployeListPage = () => {
    return (
        <div tw="flex flex-col items-center">
            <Link to="/dashboard/register" tw="mb-4">
                <button tw="px-4 py-2 bg-blue-500 text-white rounded">Create user</button>
            </Link>
            <EmployeListComponent />
        </div>
    );
};

export default EmployeListPage;
