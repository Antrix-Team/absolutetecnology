import axios from "axios"

const login = async (crendenciales) => {

    try {
        const response = await axios.post('http://localhost:3000/api/login', crendenciales, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if(response.status !== 200){
            throw new Error("hubo un problema al iniciar sesion")
        }
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message)
    }
}

export default login