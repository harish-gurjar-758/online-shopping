import axios from 'axios';

const MAIN_API = 'http://localhost:5000/api';

// -------
// User
// -------

// Register
export const registerApi = async (data) => {
    try {
        const responce = await axios.post(`${MAIN_API}/user`, data,{
            
        });
        return responce.data
    } catch (error) {

    }
}