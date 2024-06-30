import axios from "axios";

const urlemployee = import.meta.env.VITE_URL;

const ProductListProvider = async () => {
    try {
        const response = await axios.get(`${urlemployee}/products`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true 
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new Error('Sesión expirada o no autorizada. Por favor, inicie sesión nuevamente.');
        }
        throw new Error(error.response?.data?.message || error.message);
    }
};

const CreateProduct = async(formData) => {
    try {
        const response = await axios.post(`${urlemployee}/products`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        });

        return response.data;

    } catch (error) {
        if(error.response.status === 401) {
            throw new Error("Sesión expirada o no autorizada. Por favor inicie sesión nuevamente");
        }

        throw new Error(JSON.stringify(error.response?.data?.errors)|| "Error al crear el producto");
    }
}

const UpdateProduct = async(id,data) => {
    try {
        const response = await axios.put(`${urlemployee}/products/${id}`, data, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })

        return response.data;
    } catch (error) {
        if(error.response.status === 401) {
            throw new Error("Sesión expirada o no autorizada. Por favor inicie sesión nuevamente");
        }

        throw new Error(JSON.stringify(error.response?.data?.errors) || "Error al crear el producto");
    }
}

const GetProductById = async (id) => {
    try {
        const response = await axios.get(`${urlemployee}/products/${id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        if(error.response.status === 401) {
            throw new Error("Sesión expirada o no autorizada. Por favor inicie sesión nuevamente");
        }
        console.log(error);
    }
}

export {ProductListProvider, CreateProduct, GetProductById, UpdateProduct};
