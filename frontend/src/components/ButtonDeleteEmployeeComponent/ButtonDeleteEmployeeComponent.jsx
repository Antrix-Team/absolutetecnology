import React from "react";
import tw from "twin.macro";
import axios from "axios";

const urldeleteUser = import.meta.env.VITE_URL;

const ButtonDeleteEmployeeComponent = ({ employeeId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${urldeleteUser}/users/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      await onDelete(employeeId);
    } catch (error) {
      console.error("Error eliminando el empleado:", error);
    }
  };

  return (
    <button
      tw="bg-red-500 text-black px-0.5 py-1 rounded hover:bg-red-600 focus:outline-none w-full"
      onClick={handleDelete}
    >
      Eliminar
    </button>
  );
};

export default ButtonDeleteEmployeeComponent;